const fs = require('fs');
const xml2js = require('xml2js');

// Read and parse the JSON data
const jsonData = JSON.parse(fs.readFileSync('../server/histofy/src/main/resources/data/characteristic_colors_corrected.json', 'utf8'));

// Read the XML data
const xmlData = fs.readFileSync('../server/histofy/src/main/resources/data/allImageMetadata.xml', 'utf8');

// Convert the XML data to a JavaScript object
xml2js.parseString(xmlData, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }

    // Iterate over the image tags
    result.HistoImages.image.forEach(image => {
        // Find the corresponding entry in the JSON data
        const jsonEntry = jsonData[image.$.src];
        if (jsonEntry) {
            // Add the attributes to the image tag
            image.$.hue = jsonEntry.hue;
            image.$.saturation = jsonEntry.saturation;
            image.$.brightness = jsonEntry.brightness;
            image.$.coverage = jsonEntry.coverage;
        }
    });

    // Convert the updated object back to XML
    const builder = new xml2js.Builder();
    const updatedXmlData = builder.buildObject(result);

    // Write the updated XML data back to the file
    fs.writeFileSync('../server/histofy/src/main/resources/data/allImageMetadata.xml', updatedXmlData);
});