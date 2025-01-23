
# mip2024-03-bfs - Testbericht
Dieser Testbericht wurde am 10. April 2024 erstellt und durchgeführt.

## Prüfungsumgebung
* Docker-Version: 25.0.3, build 4debf41
* Orthanc-Version: 22.6.1
* Postgres-Version: latest *(stand 10.04.20204)*
* Nginx-Version: latest *(stand 10.04.20204)*
* Selenium-Version: 4.19.0
* Mockito-Version: 5.7.0

## Frontend Tests
Die Frontend Tests wurden mithilfe von **Selenium** ungesetzt.

**Grundvoraussetzungen:**
Vor jedem der aufgelisteten Test-Cases wird eine Setup-Methode ("setUp")durchgeführt. Bei dieser wird die Login-Page aufgerufen und es wird sich mit dem Benutzernamen "User" und dem Passwort "1234" auf der Seite eingeloggt. 

* **test_searchbar:** *erfolgreich durchgeführt*:
In diesem Test wird die Suchfunktion der Applikation getestet. Hierfür wird in die Suchleiste das Wort "Katze" hinzugefügt und anschliessend der Suchknopf gedrückt. 
Nun wird überprüft, ob insgesamt 7 Suchresultate auf der Seite angezeigt werden.
In einem weiteren Schritt wird die Suche zurückgesetzt und es wird überprüft, ob alle (630) Bilder wieder angezeigt werden.
    - Suchfunktion: *funktioniert*
    - Reset der Suchfunktion: *funktioniert*
    - "Bilder geladen" Counter:  *funktioniert*

* **test_searchTag:** *erfolgreich durchgeführt*:
In diesem Test wird einer Instanz ein Tag zugewiesen und anschliessend nach diesem gefiltert. Hierfür wird in einem ersten Schritt die Detailansicht der ersten Instanz aufgerufen. In der Detailansicht wird nun dieser Instanz der Tag "FHNW" zugewiesen. Nun wird wieder das Dashboard aufgerufen. Im Dashboard wird nun nach dem Tag "FHNW" gesucht und es wird überprüft, ob genau 1 Suchresultat angezeigt wird. Nun wird erneut die Detailansicht aufgerufen und der Tag wird wieder von der Instanz entfernt. 
    - Navigation zur Detailansicht: *funktioniert*
    - Hinzufügen von Tag zu einer Instanz: *funktioniert*
    - Navigation zurück zum Dashboard: *funktioniert*
    - Tagsuche: *funktioniert*
    - Entfernen von Tag: *funktioniert*
* **test_comments:** *erfolgreich durchgeführt*:
In diesem Test wird einer Instanz ein Kommentar hinzugefügt und anschliessend wieder gelöscht. Hierzu wird in der Dashboardansicht die erste Instanz angeklickt, um zur Detailansicht zu gelangen. Nun wird über das Formular ein neuer Kommentar erstellt und anschliessend wird überprüft, ob dieser erfolgreich erstellt wurde. In einem weiteren Schritt wird dieser Kommentar wieder gelöscht und es wird überprüft, ob dies ebenfalls erfolgreich stattgefunden hat.
    - Erstellen eines Kommentars: *funktioniert*
    - Anzeigen eines Kommentars: *funktioniert*
    - Entfernen eines Kommentars: *funktioniert*
* **test_add_edit_delete_new_tag:** *erfolgreich durchgeführt*:
In diesem Test wird ein neuer Tag erstellt, editiert und schlussendlich gelöscht.
Hierbei wird in einem ersten Schritt die Tagmanagementseite aufgerufen. In dieser wird nun ein neuer Tag mit dem Namen "test" erstellt und anschliessend wird überprüft, ob dieser erfolgreich erstellt wurde und in der Liste angezeigt wird. Im zweiten Schritt wird der neu erstellte Tag editiert, hierbei wird der Name von "test" auf "Test" geändert; auch bei diesem Schritt wird überprüft, ob das Editieren erfolgreich stattgefunden hat und ob es richtig in der Liste angezeigt wird. Im letzten Schritt wird der neu erstellte Tag wieder gelöscht und es wird dementsprechend überprüft, ob die Löschung erfolgreich stattgefunden hat.  
    - Aufrufen der Tagmanagementseite: *funktioniert*
    - Hinzufügen von einem Tag: *funktioniert*
    - Editieren eines Tags: *funktioniert*
    - Löschen eines Tags: *funktioniert*
    
Am Ende des einzelnen Tests wird die "tearDown" Funktion aufgerufen. In dieser loggt sich das Programm wieder aus.

## Backend Tests
Die Backend-Tests wurden in **Kotlin** mithilfe von **Mockito** realisiert.

### Instances
* **findAll - empty list:** *erfolgreich durchgeführt*:
Dieser Test gilt als erfolgreich, wenn die findAll() Funktion einen "HttpStatus.OK" und einen leeren Body zurückgibt.
* **findAll- non-empty list:** *erfolgreich durchgeführt*:
Bei diesem Test werden 2 Instanzen erstellt. Dieser Test gilt als erfolgreich, wenn die findAll() Funktion einen "HttpStatus.OK" und einen Body zurückgibt. 
* **findSingleInstance - instance found:** *erfolgreich durchgeführt*:
In dieser Funktion wird eine Instanz erstellt. Dieser Test gilt als erfolgreich, wenn die findSingleInstance() Funktion einen "HttpStatus.OK" und einen Body zurückgibt. 
* **findSingleInstance - instance not found:** *erfolgreich durchgeführt*:
In dieser Funktion wird eine Instanz erstellt. Dieser Test gilt als erfolgreich, wenn durch die findSingleInstance() die Fehlermeldung: "no such Instance with id: [ID]" entsteht.
* **findByUid - instance found:** *erfolgreich durchgeführt*:
In dieser Funktion wird eine Instanz erstellt. Dieser Test gilt als erfolgreich, wenn die findByUid() Funktion die erstellte Instanz zurückgibt.
* **findByUid - instance not found:** *erfolgreich durchgeführt*:
In dieser Funktion wird eine Instanz erstellt. Dieser Test gilt als erfolgreich, wenn durch die findByUid() die Fehlermeldung: "no such Instance with id: [ID]" entsteht.

### Tags
* **findAll - empty list:** *erfolgreich durchgeführt*:
Dieser Test gilt als erfolgreich, wenn die findAll() Funktion einen "HttpStatus.NO_CONTENT" und einen leeren Body zurückgibt.
* **findAll - non-empty list:** *erfolgreich durchgeführt*
Bei diesem Test werden 2 Tags erstellt. Dieser Test gilt als erfolgreich, wenn die findAll() Funktion einen "HttpStatus.OK" und einen Body zurückgibt. 
* **findbyId - tag found:** *erfolgreich durchgeführt*:
Bei diesem Test wird ein Tag erstellt. Dieser Test gilt als erfolgreich, wenn die findById() Funktion den erwarteten Tag zurückliefert.
* **findbyId - tag not found:** *erfolgreich durchgeführt*:
Dieser Test gilt als erfolgreich, wenn die findById() eine ResourceNotFoundException zurückwirft.
* **findbyId - invalid tag ID:** *erfolgreich durchgeführt*:
Bei diesem Test wird ein Tag mit einer negativen ID erstellt. Dieser Test gilt als erfolgreich, wenn die findById() eine IllegalArgumentException zurückwirft.
* **updateTag - existing Tag:** *erfolgreich durchgeführt*:
Bei diesem Test wird ein Tag erstellt. Der namespace wird mithilfe der updateTag() Funktion mutiert. Der Test gilt als erfolgreich, wenn dem Tag der neue Wert erfolgreich zugewiesen wurde.
* **updateTag - non-existing Tag:** *erfolgreich durchgeführt*:
Dieser Test gilt als erfolgreich, wenn die updateTag() eine ResourceNotFoundException zurückwirft.
* **deleteTag - existing Tag:** *erfolgreich durchgeführt*:
Bei diesem Test wird ein Tag erstellt, welcher anschliessend in der deleteTag() Funktion gelöscht wird. Dieser Test gilt als erfolgreich, wenn die findAll() Funktion einen "HttpStatus.NO_CONTENT" und einen leeren Body zurückgibt.
* **deleteTag - non-existing Tag:** *erfolgreich durchgeführt*:
Dieser Test gilt als erfolgreich, wenn die deleteTag() eine ResourceNotFoundException zurückwirft.
* **addTag - tag created successfully:** *erfolgreich durchgeführt*:
Bei diesem Tag wird mithilfe der addTag() Funktion ein neuer Tag erstellt. Dieser Test gilt als erfolgreich, wenn die findAll() Funktion einem "HttpStatus.CREATED" und der responseEntity.body.namespace dem erstellten Tag namespace entspricht.
* **addTag - tag already existing:** *erfolgreich durchgeführt*:
Bei diesem Tag werden zwei Tags mit demselben namespace erstellt. Der Test gilt als erfolgreich, wenn die zurückgegebene exception.message von addTag(), "Tag with namespace: existingNamespace already exists" entspricht.
* **addTag - tag namespace to long:** *erfolgreich durchgeführt*:
Bei diesem Test wird ein Tag erstellt, welcher 129 Zeichen lang ist. Der Test gilt als erfolgreich, wenn die zurückgegebene exception.message von addTag(), "Tag namespace is too long: [namespace]" entspricht.
* **addTagToInstance - returns saved instance when instance and tag exist:** *erfolgreich durchgeführt*:
Bei diesem Test wird eine Instanz und ein Tag erstellt. Der Tag wird anschliessend mit der addTagToInstance() Funktion der Instanz zugewiesen. Dieser Test gilt als erfolgreich, wenn die findAll() Funktion einen "HttpStatus.OK" und einen leeren Body zurückgibt.
* **deleteTag - deleted Tag is not shown on instance:** *erfolgreich durchgeführt*:
Bei diesem Test wird eine Instanz und ein Tag erstellt. Der Tag wird der Instanz zugewiesen mithilfe der Funktion addTagToInstance() zugewiesen und anschliessend mit der removeTagFromInstance() Funktion wieder entfernt. Der Test gilt als erfolgreich, wenn die Instanz den Tag nicht beinhaltet.

### Comments
* **addCommentToInstance returns saved instance with added comment:** *erfolgreich durchgeführt*:
Bei diesem Test wird eine Instanz und ein Kommentar erstellt. Dieser Kommentar gilt als erfolgreich, wenn der Kommentar mithilfe der addCommentToInstance() Funktion, der Instanz zugewiesen wird. 
* **removeCommentFromInstance returns saved instance without the removed comment:** *erfolgreich durchgeführt*:
Bei diesem Test wird eine Instanz und ein Kommentar erstellt. Dieser Kommentar gilt als erfolgreich, wenn der Kommentar mithilfe der addCommentToInstance() Funktion der Instanz zugewiesen und anschliessend mit der removeCommentFromInstance() wieder entfernt werden konnte. 