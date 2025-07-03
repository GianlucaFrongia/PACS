import os
import xml.etree.ElementTree as ET
from datetime import datetime
import logging
import json
import numpy as np
import requests as requests
from pydicom.uid import generate_uid, ExplicitVRLittleEndian
from PIL.Image import Image
from PIL import Image
import pydicom
from pydicom.dataset import Dataset, FileMetaDataset
from requests.auth import HTTPBasicAuth

url = "http://localhost:8042/instances"
username = 'orthanc'
password = 'orthanc'

json_path = 'data/characteristic_colors_corrected.json'

# Erstelle Logger
logger = logging.getLogger('logger')
logger.setLevel(logging.INFO)

# FileHandler für Warnmeldungen
file_handler = logging.FileHandler('warnings.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))

# StreamHandler für die Konsolenausgabe
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))

logger.addHandler(file_handler)
logger.addHandler(console_handler)

def parse_xml_metadata(xml_file_path):
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    images_metadata = []
    for image in root.findall('image'):

        metadata = {
            'src': image.get('src'),
            'description': image.find('description').text.strip(),
            'originalURL': image.find('originalURL').text.strip(),
            'magnification': image.find('magnification').text.strip(),
            'uid': image.find('uid').text.strip()
        }
        images_metadata.append(metadata)

    return images_metadata

def read_image_metadata(image_path):
    with open(json_path, 'r') as file:

        image_data = json.load(file)
        if image_path in image_data:
            info = image_data[image_path]
            return str(info['hue']) + ", " + str(info['saturation']) + ", " + str(info['brightness']) + ", " + str(info['pixels']) + ", " + str(info['width']) + ", " + str(info['height']) + ", " + str(info['coverage'])


def create_dicom(data):
    # Neues DICOM-Datenset erstellen
    ds = Dataset()
    ds.file_meta = FileMetaDataset()
    ds.file_meta.TransferSyntaxUID = ExplicitVRLittleEndian

    # Aktuelles Datum und Uhrzeit für das DICOM-Header setzen
    now = datetime.now()
    ds.StudyDate = now.strftime('%Y%m%d')
    ds.StudyTime = now.strftime('%H%M%S')

    ds.PatientName = "Telvis^Test"
    ds.PatientID = "424243"
    ds.Modality = "OT"

    # Aus XML Gelesen (mögliche Felder https://dicom.nema.org/dicom/2011/11_06pu.pdf)
    ds.ImageComments = data["description"]
    ds.PixelDataProviderURL = data["originalURL"]
    if any(char.isalpha() for char in data["magnification"]):
        ds.EstimatedRadiographicMagnificationFactor = 0
    else:
        ds.EstimatedRadiographicMagnificationFactor = data["magnification"].replace(',', '.').replace(' ', '')
    ds.ImagePresentationComments = read_image_metadata(data['src'])

    ds.InstanceNumber = 1
    ds.StudyInstanceUID = pydicom.uid.generate_uid()
    ds.SeriesInstanceUID = pydicom.uid.generate_uid()

    ds.SOPInstanceUID = "1.2.826.0.1.3680043." + data["uid"].lstrip("0")
    ds.SOPClassUID = pydicom.uid.SecondaryCaptureImageStorage

    # Bild speicherung
    img = Image.open("data/allJPEGImages/" + data['src']).convert('RGB')
    img_array = np.array(img)

    ds.PixelData = img_array.tobytes()
    ds.Rows, ds.Columns, ds.SamplesPerPixel = img_array.shape
    ds.PhotometricInterpretation = "RGB"
    ds.BitsStored = 8
    ds.BitsAllocated = 8
    ds.HighBit = 7
    ds.PixelRepresentation = 0

    ds.is_little_endian = True
    ds.is_implicit_VR = False

    # DICOM-Datei speichern
    ds.save_as("temp/" + data['src'].replace(".jpg", "") + '.dcm', write_like_original=False)

def send_to_pacs():
    directory = os.fsencode("temp")
    for index, file in enumerate(os.listdir(directory), start=1):
        filename = "temp/" + os.fsdecode(file)
        if filename == "temp/.gitignore":
            continue

        with open(filename, "rb") as f:
            headers = {"Content-Type": "application/dicom"}
            response = requests.post(url, data=f, headers=headers, auth=HTTPBasicAuth(username, password))
            if response.status_code == 200:
                logger.info(f'[{index-1}/{len(metadata)}] Die Datei {filename} wurde erfolgreich an den Orthanc Server gesendet.')
            else:
                logger.warning(f'[{index-1}/{len(metadata)}] Fehler beim Senden der {filename}:, {response.status_code}, {response.text}')
        os.remove(filename)

metadata = parse_xml_metadata('data/allImageMetadata.xml')
for i, data in enumerate(metadata, start=1):
    logger.info(f'[{i}/{len(metadata)}] Dicom-Datei wurden erstellt.')
    create_dicom(data)
send_to_pacs()

