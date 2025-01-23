








# Risikomanagement Bericht
## 1.1 Risikoanalyse Verfahren
Für die Analyse des Risikos wird das FMEA-Verfahren angewendet.
## 1.2 Akzeptanzkriterien der Risikoanalyse
### 1.2.1 Definition der Auswirkung
|Klasse|Auswirkung  | Für Sachen|Für Personen |
|------|------------|-------------|---|
|  1|unwesentlich|Beschädigung|geringfügige Verletzung
|2|geringfügig|Zerstörung|mittlere Verletzung
|3|kritisch|lang andauernde oder grossflächige Auswirkung|schwere Verletzung oder Tod einer Person

### 1.2.2 Definition der Auftretenswahrscheinlichkeit
|Grad|Wahrscheinlichkeit  | Erläuterung|
|------|------------|-------------|
|A|unvorstellbar|wird während der Systemlebensdauer (x Jahre) vermutlich nicht auftreten
|B|unwahrscheinlich|wird während der Systemlebensdauer (x Jahre) vielleicht einmal auftreten
|C|wahrscheinlich|wird während der Systemlebensdauer (x Jahre) zwischen 2-5 mal auftreten
|D|häufig|wird während der Systemlebensdauer (x Jahre) mehr als fünf mal auftreten
### 1.2.3 Risikobewertungsmatrix
![Bild Risikomatrix](/documentation/images/Risikomatrix.jpg)

![Bild Risikomatrixlegende](/documentation/images/RisikomatrixLegende.jpg)
## 2 Risikoanalyse 
### 2.1 Identifizierung von Gefährdungen
1. Server-Ausfall
2. SQL-Injection
4. Cross-Site Scripting
5. Unsichere Datenübertragung
6. Mangelnde Überwachung und Protokollierung
7. Phishing und Social Engineering

### 2.2 Einschätzung des Risikos
**Server-Ausfall**

|Risiko-ID|Auftretenswahrscheinlichkeit|Beschreibung der Gefahr|Auswirkung|
|---------|--|--|--|
|RID01|B - unwahrscheinlich|Es kann temporär nicht mehr auf die Applikation zugegriffen werden.| geringfügig

**SQL-Injection**

|Risiko-ID|Auftretenswahrscheinlichkeit|Beschreibung der Gefahr|Auswirkung|
|---------|--|--|--|
|RID02|B - unwahrscheinlich|Die Angreifer können schädlichen SQL-Code in Eingabefelder einschleusen und so Datenbanken manipulieren.| kritisch

**Cross-Site Scripting**

|Risiko-ID|Auftretenswahrscheinlichkeit|Beschreibung der Gefahr|Auswirkung|
|---------|--|--|--|
|RID03|B - unwahrscheinlich|Durch das Einschleusen von Skripten können Angreifer schädlichen Code in Webseiten injizieren, der dann von anderen Benutzern ausgeführt wird.| kritisch

**Unsichere Datenübertragung**

|Risiko-ID|Auftretenswahrscheinlichkeit|Beschreibung der Gefahr|Auswirkung|
|---------|--|--|--|
|RID04|B - wahrscheinlich| Bei der Analyse zur Verminderung von Risiken durch unsichere Datenübertragung wurde die vollständige Implementierung von HTTPS untersucht.| kritisch

**Mangelnde Überwachung und Protokollierung**

|Risiko-ID|Auftretenswahrscheinlichkeit|Beschreibung der Gefahr|Auswirkung|
|---------|--|--|--|
|RID05|B - wahrscheinlich|Fehlende Überwachungs- und Protokollierungsmassnahmen erschweren es, Angriffe zu erkennen und darauf zu reagieren.| kritisch

**Phishing und Social Engineering**

|Risiko-ID|Auftretenswahrscheinlichkeit|Beschreibung der Gefahr|Auswirkung|
|---------|--|--|--|
|RID06|B - wahrscheinlich|Benutzer können durch gefälschte E-Mails oder Websites dazu verleitet werden, vertrauliche Informationen preiszugeben.| kritisch


## 3 Risikobewertung
![Bild Risikoanalyse Vorher](/documentation/images/Risikoanalyse_Alt.jpg)
## 4 Risikobeherrschung
### 4.1 Analyse der Optionen für die Risikobeherrschung

### 4.2 Analyse der Optionen für die Risikobeherrschung
|Risiko-ID|Analyse der Risikobeherrschung
|--|--|
|RID01|
|RID02|Bei der Analyse zur Vermeidung von SQL-Injections wurden Maßnahmen wie Input-Validierung verwendet.
|RID03|Bei der Analyse zur Vermeidung von Cross-Site Scripting wurden Maßnahmen wie Input-Validierung verwendet.
|RID04|Zur Verminderung von Risiken durch unsichere Datenübertragung wird die vollständige Implementierung von HTTPS durchgeführt.
|RID05|Das System loggt sämtliche wichtige Ereignisse.
|RID06|Die implementierten Maßnahmen umfassen die Einrichtung von Sicherheitsschulungen zur Sensibilisierung der Mitarbeiter und die Durchsetzung einer Firmenrichtlinie, die besagt, dass alle ungewöhnlichen oder unerwarteten Anfragen überprüft werden müssen, bevor darauf reagiert wird.

### 4.2 Bewertung der Restrisiken
![Bild Risikoanalyse Nachher](/documentation/images/Risikoanalyse_Neu.jpg)
### 4.3 Risiko-Nutzen-Analyse
Nach der Implementation der Risikobeherrschungsmassnahmen, gibt es immernoch bestehende Restrisiken, welche das System gefährden können. Jedoch sind diese oftmals nur noch so gering möglich, dass es den Nutzen der Applikation  Uhr nicht überwertet. 
## 5 Bewertung der Akzeptanz des Restrisikos
Von den Risikofällen sind die Meisten davon im "akzeptablen" Bereich und einige wenige noch im "bedingt akzeptablen" Bereich. Daher, ist das Restrisiko bedingt akzeptabel.
