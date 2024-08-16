import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http"; // Importiert HttpClient und HttpParams für HTTP-Anfragen
import { iAmUser } from 'src/app/models/iAmUser'; // Importiert das iAmUser-Modell
import { CommunicationRequestService } from "../lib/communication-request.service"; // Importiert den CommunicationRequestService

@Injectable({
  providedIn: 'root' // Der Service wird auf Root-Ebene bereitgestellt
})
export class IAmService extends CommunicationRequestService<any> {

  // Initialisiert einen Benutzer mit leeren Feldern
  iAmUser: iAmUser = {
    name: "", username: ""
  };

  // Definiert den Pfad zum Backend-Endpunkt für Authentifizierung
  protected readonly backendUrlExt: string = 'auth';

  // Bereitet die HTTP-Parameter für die Anfrage vor
  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    // Wenn der Parameter einen Benutzernamen enthält, setzt diesen in den HttpParams
    if (reqParameter.username)
      return new HttpParams().set('username', reqParameter.username);

    return new HttpParams(); // Andernfalls gibt leere HttpParams zurück
  }

  // Lädt den Benutzer anhand der übergebenen Header
  loadUser(headers?: any) {
    // Verwendet die Methode sendGetRequest des CommunicationRequestService, um eine GET-Anfrage zu senden
    return super.sendGetRequest<iAmUser>(this.backendUrlExt + '/iAm', null, headers)
      .then((user: any) => {
        // Setzt den erhaltenen Benutzer in das iAmUser-Objekt und gibt den Benutzer zurück
        this.iAmUser = user
        return user;
      });
  }
}
