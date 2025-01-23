# Software Requirements Specification
## For <project name>

Version 0.1  
Oliver Schlumpf, Gianluca Frongia, Nicolas Bopp
Fachhochschule Nordwestschweiz
21.02.2024

Table of Contents
=================
* [Revision History](#revision-history)
* 1 [Introduction](#1-introduction)
  * 1.1 [Document Purpose](#11-document-purpose)
  * 1.2 [Product Scope](#12-product-scope)
  * 1.3 [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
  * 1.4 [References](#14-references)
  * 1.5 [Document Overview](#15-document-overview)
* 2 [Product Overview](#2-product-overview)
  * 2.1 [Product Perspective](#21-product-perspective)
  * 2.2 [Product Functions](#22-product-functions)
    * 2.2.1 [Use Case Übersichtstabelle](#221-use-case-bersichtstabelle)
  * 2.3 [User Characteristics](#24-user-characteristics)
  * 2.4 [Assumptions and Dependencies](#25-assumptions-and-dependencies)
* 3 [Requirements](#3-requirements)
  * 3.1 [External Interfaces](#31-external-interfaces)
    * 3.1.1 [User Interfaces](#311-user-interfaces)
    * 3.1.2 [Hardware Interfaces](#312-hardware-interfaces)
    * 3.1.3 [Software Interfaces](#313-software-interfaces)
  * 3.2 [Functional](#32-functional)
    * 3.2.1 [Use Case 1](#311-use-case-1)
    * 3.2.2 [Use Case 2](#311-use-case-2)
    * 3.2.3 [Use Case 3](#311-use-case-3)
    * 3.2.4 [Use Case 4](#311-use-case-4)
    * 3.2.5 [Use Case 5](#311-use-case-5)
    * 3.2.6 [Use Case 6](#311-use-case-6)
    * 3.2.7 [Use Case 7](#311-use-case-7)
    * 3.2.8 [Use Case 8](#311-use-case-8)
    * 3.2.9 [Use Case 9](#311-use-case-9)
    * 3.2.10 [Use Case 10](#311-use-case-10)
    * 3.2.11 [Use Case 11](#311-use-case-11)
    * 3.2.12 [Use Case 12](#311-use-case-12)
  * 3.3 [Nicht funktionelle Anforderungen](#33-nonfunctional)
    * 3.3.1 [Performance](#331-performance)
    * 3.3.2 [Security](#332-security)
    * 3.3.3 [Safety](#333-safety)
  * 3.4 [Compliance](#34-compliance)
  * 3.5 [Design and Implementation](#35-design-and-implementation)
    * 3.5.1 [Design](#350)
    * 3.5.2 [Installation](#351-installation)
    * 3.5.3 [Distribution](#352-distribution)
    * 3.5.4 [Maintainability](#353-maintainability)
    * 3.5.5 [Deadline](#357-deadline)
  * 3.6 [Database Structure](#36-database-structure)

## Revision History
| Name                                             | Date        | Reason For Changes | Version |
|--------------------------------------------------|-------------|--------------------|---------|
| Oliver Schlumpf, Gianluca Frongia, Nicolas Bopp  | 21.02.2024  | Dokument erstellt  | 0.1     |
|                                                  |             |                    |         |

## 1. Introduction
Die Verfügbarkeit und Zugänglichkeit von Patientendaten spielen in der medizinischen Forschung eine essenzielle Rolle. Damit der wissenschaftliche Fortschritt beschleunigt werden kann und die Patientenversorgung stetig verbessert wird, bedarf es innovativer Lösungen. Im Bereich der Histologie, wo Gewebeproben eine sehr wichtige Rolle spielen zur Forschung und Diagnose von Krankheiten, ist ein effizientes Datenmanagement-System unverzichtbar. 

### 1.1 Document Purpose
Dieses Dokument dient als Informationsgrundlage für Entwickelnde, Forschende und Administratoren des <project name>-Projektes. Es enthält die Anforderungen an das Endprodukt und dient als Orientierung für die technische Umsetzung des Projektes.

### 1.2 Product Scope
Das Ziel des <project name>-Projekts ist es, eine Software zur Verfügung zu stellen, welche das Arbeiten und Forschen  mit Histologie-Gewebeproben erleichtert. Der Hauptzweck ist es, dass die Proben übersichtlich mitsamt Metadaten Informationen im System dargestellt werden. Diese Proben können zusätzlich mit Tags versehen werden, damit einfacher nach diesen gefiltert werden kann.
    
### 1.3 Definitions, Acronyms and Abbreviations
| Begriff                  | Definition                                                                                           |
|--------------------------|------------------------------------------------------------------------------------------------------|
| Histologie               | Ist die Wissenschaft von den biologischen Geweben                                                    |
| IEEE                     | Institute of Electrical and Electronics Engineers                                                    |
| Stakeholder              | alle Personen, die am Projektausgang interessiert sind oder involviert sind                          |
| OWASP                    | Open Web Application Security Project                                                                |
| SRP                      | Single Responsibility Principle                                                                      |
| React                    | Ist eine JavaScript-Programmbibliothek zur Erstellung von webbasierten Benutzeroberflächen           |
| Microservice-Architektur | Ist eine Anwendung mit eigenständigen Komponenten, die jeden Anwendungsprozess als Service ausführen |

### 1.4 References
| Nummer | Thema             | Datum       | URL / Quelle                   |
|--------|-------------------|-------------|--------------------------------|
| 01     | Projekt           | 20.02.2024  | Kick-Off Meeting, FHNW Muttenz |
| 02     | Web-Application   | 22.02.2024  | Technologie-Input R. Tanner    |
| 03     | Projekt           | 23.02.2024  | 1. Statustreffen, FHNW Muttenz |

### 1.5 Document Overview
Dieses Dokument ist entlang des IEEE Guide to Software Requirements Specifications strukturiert. Es sind die grundlegenden Funktionen und Konzepte für das Projekt <project name>. Kapitel 2 beschreibt Zweck, Funktionen und Benutzergruppen basierend auf Bedürfnissen von Stakeholdern. In Kapitel 3 werden die Anforderungen und Bedingungen an die Umsetzung des Projektes geschildert. Ausserdem werden die Funktionen exakt beschrieben.

## 2. Product Overview
Diese Applikation wurde erstellt, um die Verwaltung von verschiedenen Gewebeproben im Bereich der Histologie zu vereinfachen. Die verschiedenen histologischen Bilder müssen in einer Gesamtübersicht ersichtlich sein. Die verschiedenen Bilder können mit verschiedenen Tags versehen werden um nach diesen filtern zu können. Desweiteren ist eine Detailansicht der einzelnen Bilder möglich, um deren Metainformationen auslesen zu können.

### 2.1 Product Perspective
Im Spitalalltag fallen viele Informationen über die Patienten an. Die Datenflut wird stets grösser und es wird immer wie schwieriger die wichtigsten Daten für die unterschiedlichen Sparten in der Medizin auszufiltern. Daher wäre für Forschungszwecke ein unterstützendes Element, welches die notwendigen Informationen für den Nutzen der Forschung vorgängig filtert und einen schnellen und einfachen Zugang zu den Informationen gewährleistet, sinnvoll. Bis anhin gibt es noch kein solches Werkzeug, welches explizit die Forschende bei der Extraktion von Information unterstützt.

### 2.2 Product Functions
Wie in Kapitel 2.0 erwähnt, dient diese Applikation zur Verwaltung von Histologie-Gewebeproben.
    
#### 2.2.1 Use Case Übersichtstabelle

| Use-Case ID | Aktoren         | Titel                          | Beschreibung                                                                                                             |
|-------------|-----------------|--------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| 01          | Alle            | Login                          | Der Benutzer loggt sich mit Username und Passwort ein.                                                                   |
| 02          | Alle            | Übersicht/Dashboard            | Der Benutzer erkennt in der Übersicht so viele Bilder als möglich und kann von dort weiter zur Detailansicht navigieren. |
| 03          | Alle            | Detailansicht                  | Der Benutzer wählt in der Gesamtübersicht eine Gewebeprobe aus, um zur Detailansicht zu gelangen.                        |
| 04          | Alle            | Filtern                        | Der Benutzer filtert nach verschiedenen Tags.                                                                            |
| 05          | Alle            | Tags anhängen und wegnehmen    | Der Benutzer hängt einen oder mehrere Tags an einer Gewebeprobe dran und kann sie wieder wegnehmen.                      |
| 06          | Alle            | Tagverwaltung                  | Der Benutzer fügt einen Tag hinzu, bearbeitet Tags und kann Tags löschen.                                                |
| 07          | Alle            | Kommentar erfassen und löschen | Der Benutzer kann einen Kommentar zur Gewebeprobe hinzufügen und bestehende Kommentare löschen.                          |
| 08          | Alle            | Suchfunktion                   | Der Benutzer kann Tags oder Beschreibungen suchen.                                                                       |
| 09          | Alle            | Nachtmodus                     | Der Benutzer wechselt zwischen Tag- und Nachtmodus.                                                                      |
| 10          | Alle            | Sprache ändern                 | Der Benutzer wechselt zwischen Deutsch und Französisch.                                                                  |
| 11          | Alle            | Farbanalyse                    | Sortieren der Bilder durch die fünf Primärfarben in den Bildern.                                                         |
| 12          | Administratoren | Monitoren                      | Einsehen der Zugrifflogs.                                                                                                |

### 2.3 User Characteristics
Diese Applikation wird von zwei verschiedenen Benutzergruppen verwendet. Einerseits von Forschenden, welche die Applikation für das Verwalten und Tagen der verschiedenen Gewebeproben verwenden. Andererseits von Administratoren, welcher über alle Rechte der Forschenden verwenden und zusätzlich noch Rechte für das Monitoring verfügen.
    
### 2.4 Assumptions and Dependencies
Wenn folgende Annahmen und Bedingungen nicht erfüllt sind, hat dies Auswirkungen auf die erfassten Anforderungen und unter Umständen auf die Durchführbarkeit des Projektes. Die Organisation des Kunden ist verantwortlich für die physische Infrastruktur und ist in der Lage, die Komponenten der Applikation selbstständig zu hosten. Der exakte Aufbau der Systemarchitektur wird in einer späteren  Projektphase definiert. Der Kunde ist selbst für die Korrektheit der erfassten Daten verantwortlich. 

## 3. Requirements

### 3.1 External Interfaces

#### 3.1.1 User interfaces
Die User Interfaces werden in zwei verschiedene Benutzergruppen unterteilt.
Die Forschenden und der Administrator können auf die Applikation über ihren Computer oder Laptop durch einen Web-Browser zugreifen.

#### 3.1.2 Hardware interfaces
Für die Verwendung der Applikation wird ein Laptop oder ein PC benötigt mit einem Monitor von mindestens 14 Zoll. Kleinere Bildschirme sind möglich, jedoch wird die Erkennbarkeit der Elemente nicht mehr gewährleistet.

#### 3.1.3 Software interfaces
![Bild Server-Design](/documentation/images/architecture.png)

- WADO Facade
  WADO-URI Rest anfragen werden von der WADO Facade abgefangen und dem Pacs Server weitergeleitet.
- H2
  Die H2 Datenbank hostet die Kommentare und Tags der Bilder.
- Uptime Kuma überwacht die Docker Container

### 3.2 Functional

![Bild Use-Case Diagramm](/documentation/images/use-case-dg.jpg)
    
#### 3.2.1 Use Case 1
| Use-Case ID     | 01                                                                                                                                           |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Login                                                                                                                                        |
| Beschreibung    | Der Benutzer loggt sich mit Username und Passwort ein.                                                                                       |
| Aktoren         | Alle                                                                                                                                         |
| Szenario        | Der Benutzer besucht den WebApp Client über einer internen Domaine. Es wird dem Benutzer eine Loginseite präsentiert mit Email und Password. |
| Erfolgsszenario | Der Benutzer gelangt zur Übersicht der Bilder.                                                                                               |

#### 3.2.2 Use Case 2
| Use-Case ID     | 02                                                                                                                                 |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Übersicht/Dashboard                                                                                                                |
| Beschreibung    | Der Benutzer erkennt in der Übersicht so viele Bilder als möglich und kann von dort weiter zur Detailansicht navigieren.           |
| Aktoren         | Alle                                                                                                                               |
| Vorbedingung    | Der Benutzer muss eingeloggt sein.                                                                                                 |
| Szenario        | Der Benutzer hat sich erfolgreich eingeloggt. Jetzt sollte er auf dem Dashboard sein und eine Übersicht über alle Bilder erhalten. |
| Erfolgsszenario | Durch erfolgreiches Login auf das Dashboard gelangen.                                                                              |

#### 3.2.3 Use Case 3
| Use-Case ID     | 03                                                                                                                                                                                         |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Detailansicht                                                                                                                                                                              |
| Beschreibung    | Der Benutzer wählt in der Gesamtübersicht eine Gewebeprobe aus, um zur Detailansicht zu gelangen.                                                                                          |
| Aktoren         | Alle                                                                                                                                                                                       |
| Vorbedingung    | Der Benutzer muss eingeloggt sein.                                                                                                                                                         |
| Szenario        | Der Benutzer findet in der Übersicht ein passendes Bild, für welches er genauere Informationen benötigt. Durch klicken auf das Bild, gelangt der Benutzer in die Detailansicht des Bildes. |
| Erfolgsszenario | Durch klicken auf das gewünschte Bild in der Übersicht, gelangt der Benutzer zu der Detailansicht.                                                                                         |

#### 3.2.4 Use Case 4
| Use-Case ID     | 04                                                                                                                                                                                   |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Filtern                                                                                                                                                                              |
| Beschreibung    | Der Benutzer filtert nach verschiedenen Tags.                                                                                                                                        |
| Aktoren         | Alle                                                                                                                                                                                 |
| Vorbedingung    | Der Benutzer muss eingeloggt sein. Zudem müssen bereits Tags erfasst worden sein nach welchen gefiltert werden kann.                                                                 |
| Szenario        | Der Benutzer möchte Gewebebilder von Tumoren einsehen. Durch das Auswählen des Tags "Tumor" in der Dropdownliste und der darauffolgende Suchbefehl, filtert es die gesuchten Bilder. |
| Erfolgsszenario | In der Übersicht erscheinen nur noch die Bilder mit dem gesuchten Tag.                                                                                                               |

#### 3.2.5 Use Case 5
| Use-Case ID     | 05                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Tags anhängen und wegnehmen.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Beschreibung    | Der Benutzer hängt einen oder mehrere Tags an einer Gewebeprobe dran und kann sie wieder wegnehmen.                                                                                                                                                                                                                                                                                                                                                                          |
| Aktoren         | Alle                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Vorbedingung    | Der Benutzer muss eingeloggt sein und ist in der Detailansicht. Zudem müssen bereits Tags erfasst worden sein.                                                                                                                                                                                                                                                                                                                                                               |
| Szenario        | Der Benutzer sieht sich ein Bild einer Gewebeprobe einer Tumorzelle an. Dabei fällt ihm auf, dass dieses Bild den Tag "Tumor" noch nicht hat. Durch das Klicken auf das Plussymbol bei den Tags, erscheint ein Pop-Up Fenster mit den bereits definierten Tags. Der Benutzer wählt die entsprechenden Tags aus und klickt auf hinzufügen. Nun fällt ihm aber auf, dass der Lungen Tag keinen sinn macht, drum klickt er auf das Kreuz neben dem Tag, um diesen zu entfernen. |
| Erfolgsszenario | Die Ausgewählten Tags werden dem Bild angehängt und können wieder weggenommen werden.                                                                                                                                                                                                                                                                                                                                                                                        |

#### 3.2.6 Use Case 6
| Use-Case ID     | 06                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Tagverwaltung.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Beschreibung    | Der Benutzer fügt einen Tag hinzu, bearbeitet Tags und kann Tags löschen.                                                                                                                                                                                                                                                                                                                                                                                    |
| Aktoren         | Alle                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Vorbedingung    | Der Benutzer muss eingeloggt sein und ist in der Detailansicht.                                                                                                                                                                                                                                                                                                                                                                                              |
| Szenario        | Der Benutzer möchte fehlende Tags ergänzen, veraltete löschen und hat bei einem Tag noch ein schreibfehler entdeckt. Dazu geht er auf den Button für die Tagverwaltung. Dort kann er oben rechts auf das Plus klicken, um einen neuen Tag hinzuzufügen. Damit er Tags bearbeiten kann, klickt der Benutzer auf den Bearbeitenbutton rechts neben dem Tag. Um den Tag zu löschen klickt der Benutzer auf den Löschenbutton rechts neben dem Bearbeitenbutton. |
| Erfolgsszenario | Der Benutzer kann Tags erstellen, bearbeiten und löschen.                                                                                                                                                                                                                                                                                                                                                                                                    |

#### 3.2.7 Use Case 7

| Use-Case ID     | 07                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Kommentar erfassen und löschen.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Beschreibung    | Der Benutzer kann einen Kommentar zur Gewebeprobe hinzufügen und bestehende Kommentare löschen.                                                                                                                                                                                                                                                                                                                                                                                             |
| Aktoren         | Alle                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Vorbedingung    | Der Benutzer muss eingeloggt sein.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Szenario        | Der Benutzer sieht bei einer Gewebeprobe eine kleine Anomalie. Auf der rechten Seite in der Detailansicht klickt der Benutzer auf die Textbox und kann seinen Kommentar verfassen, um seine Kollegen auf die Anomalie hinzuweisen. Durch klicken auf den Sendebutton (Pfeil nach rechts Button) wird der Kommentar in der chronologischen Kommentarspalte darüber eingefügt. Später hat sich die Anomalie geklärt und kann über den X-Button oben rechts bei dem Kommentar entfernt werden. |
| Erfolgsszenario | Kommentare können erstellt und wieder entfernt werden.                                                                                                                                                                                                                                                                                                                                                                                                                                      |

#### 3.2.8 Use Case 8
| Use-Case ID     | 08                                                                                                                                                                                                                                                                                                                                                                  |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Suchfunktion.                                                                                                                                                                                                                                                                                                                                                       |
| Beschreibung    | Der Benutzer kann Tags oder Beschreibungen suchen.                                                                                                                                                                                                                                                                                                                  |
| Aktoren         | Alle                                                                                                                                                                                                                                                                                                                                                                |
| Vorbedingung    | Der Benutzer muss eingeloggt sein. Es müssen Tags und Beschreibungen vorhanden sein.                                                                                                                                                                                                                                                                                |
| Szenario        | Der Benutzer sucht nach Bildern, welche den Tag Tumor haben. Er wählt in der Suchleiste den Tag "Tumor". Die Übersicht zeigt nur noch Bilder mit diesem Tag an. Auch möchte er den Begriff Querschnitt suchen. Der Benutzer gibt den Suchbegriff in die Suchleiste ein und es werden nur noch Bilder angezeigt, welche in der Beschreibung das Suchwort beinhalten. |
| Erfolgsszenario | Der Benutzer kann Tags und Beschreibungen in den Bildern suchen. Die gefundene Bilder sollen dann explizit auf dem Dashboard erscheinen.                                                                                                                                                                                                                            |


#### 3.2.9 Use Case 9
| Use-Case ID     | 09                                                                                                                                                                             |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Nachtmodus                                                                                                                                                                     |
| Beschreibung    | Der Benutzer wechselt zwischen Tag- und Nachtmodus.                                                                                                                            |
| Aktoren         | Alle                                                                                                                                                                           |
| Szenario        | Der Benutzer möchte seine Augen schonen durch den Nachtmodus. Durch das hovern über den Benutzernamen erscheint ein Dropdownmenü, wo man auch den Nachtmodus einschalten kann. |
| Erfolgsszenario | Der WebApp Client erscheint im Nachtmodus.                                                                                                                                     |

#### 3.2.10 Use Case 10
| Use-Case ID     | 10                                                                                                                                                                                                                                                        |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Sprache ändern.                                                                                                                                                                                                                                           |
| Beschreibung    | Der Benutzer wechselt zwischen Deutsch und Französisch.                                                                                                                                                                                                   |
| Aktoren         | Alle                                                                                                                                                                                                                                                      |
| Szenario        | Der Benutzer kommt aus der Romandie und möchte den WebApp Client auf französisch verwenden. Er geht auf den Benutzernamen oben rechts. Durch das hovern über dem Namen erscheint ein Dropdownmenü, wo man nun die Sprache auf französisch umstellen kann. |
| Erfolgsszenario | Der WebApp Client wird auf französisch übersetzt.                                                                                                                                                                                                         |

#### 3.2.11 Use Case 11
| Use-Case ID     | 11                                                                                                                                                                                                                                                                                                                                 |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Titel           | Farbanalyse                                                                                                                                                                                                                                                                                                                        |
| Beschreibung    | Sortieren der Bilder durch die fünf Primärfarben in den Bildern.                                                                                                                                                                                                                                                                   |
| Aktoren         | Alle                                                                                                                                                                                                                                                                                                                               |
| Szenario        | Das Data Science Team hat einen Benutzer darauf aufmerksam gemacht, dass Tumorbilder alle eine bestimmte Farbkombination aufweisen. Der Benutzer möchte dies überprüfen und wählt in der Übersicht die Sortierung nach Farben aus. Nun wäre ersichtlich, dass alle Bilder mit dem Tag "Tumor" die gleichen Primärfarben aufweisen. |
| Erfolgsszenario | Die Bilder werden in der Übersicht nach ihren fünf Primärfarben mit einer bestimmten Sättigung geordnet.                                                                                                                                                                                                                           |

#### 3.2.12 Use Case 12
| Use-Case ID     | 08                         |
|-----------------|----------------------------|
| Titel           | Monitoren                  |
| Beschreibung    | Überprüfen der Zugriffe.   |
| Aktoren         | Administratoren            |
| Szenario        | Einsehen der Zugrifflogs.  |
| Erfolgsszenario | Benutzer ersieht die Logs. |
    
### 3.3 Nicht funktionelle Anforderungen
#### 3.3.1 Performance
Das System muss auf eine Benutzerinteraktion innerhalb von maximal 300 Millisekunden reagiere. Dies bedingt jedoch, dass die maximale Datenmenge auf ein Maximum von 1000 Bildern festgelegt wird.

#### 3.3.2 Security
Das System soll vor den Top 10 der OWASP aufgelisteten Attacken geschützt werden.
    
1. Injection
2. Fehler bei der Authentifizierung
3. Verlust der vertraulichen sensiblen Daten
4. XML Eternal Entities (XXE)
5. Fehler bei der Zugriffskontrolle
6. Sicherheitsrelevante Fehlkonfiguration
7. Cross-Site Scripting
8. Unsichere Deserialisierung
9. Nutzung von Komponenten mit bekannten Schwachstellen
10. Unzureichende Protokollierung und Überwachung
    

#### 3.3.3 Safety
Das System schlägt keine Behandlungsmethoden für Patienten und Patientinnen vor.

### 3.4 Compliance
Die Daten werden auf Schweizer-Servern gespeichert

### 3.5 Design and Implementation
    
### 3.5.1 Design
![Bild Gui Login](/documentation/images/GUI/01_Login.jpg)

![Bild Gui Dashboard](/documentation/images/GUI/02_Main.jpg)

![Bild Gui Detailansicht](/documentation/images/GUI/03_Detail.jpg)

![Bild Gui Tagverwaltung](/documentation/images/GUI/04_Tags.jpg)

#### 3.5.2 Installation
Der WebApp-Client läuft direkt in den Browsern Safari, Firefox und Chrome. Es erfordert keinen separaten Download oder Installationsschritt für die Anwendung der WebApp-Client.

#### 3.5.3 Distribution
Die Software wird exklusiv innerhalb des FHNW-Netzwerks gehostet und ist somit nur für autorisierte Benutzer innerhalb dieses Netzwerks zugänglich.
    
#### 3.5.4 Maintainability
WebApp Client:
SRP als Richtlinie für die React Komponente. Durch die Aufteilung der Funktionalitäten in kleinere, spezifische Komponenten gemäß dem SRP wird der Code modularer und flexibler

Server:
Die Anwendung soll auf einer Microservice-Architektur basieren, wobei jeder Microservice in einem eigenen Docker-Container läuft. Dies ermöglicht eine effiziente Entwicklung, Bereitstellung und Skalierung der Anwendung.    

    
#### 3.5.5 Deadline
![Bild Zeitplan](/documentation/images/Zeitplan.jpg)

    
### 3.6 Database Structure

![Bild Use-Case Diagramm](/documentation/images/ERM.jpg)

