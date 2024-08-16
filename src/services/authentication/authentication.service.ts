import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; // Importiert HttpClient und HttpHeaders für HTTP-Anfragen
import { IAmService } from "./i-am.service"; // Importiert einen anderen Service, der für HTTP-Anfragen verwendet wird
import { RegisterUser } from "../../app/models/registerUser"; // Importiert das RegisterUser-Modell

@Injectable({
  providedIn: 'root' // Der Service wird auf Root-Ebene bereitgestellt
})
export class AuthenticationService {
  // Definiert den Pfad zum Backend-Endpunkt für Authentifizierung
  private readonly backendUrlPath: string = 'auth';

  // Konstruktor injiziert den IAmService, der für HTTP-Anfragen verwendet wird
  constructor(private readonly iAmService: IAmService) {
  }

  // Methode zum Einloggen des Benutzers
  login(credentials?: any) {
    // Setzt die HTTP-Header für die Basic-Authentifizierung
    const headers = new HttpHeaders(credentials ?
      { authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) } :
      { authorization: '' });

    // Verwendet den IAmService, um den Benutzer zu laden
    return this.iAmService.loadUser(headers);
  }

  // Methode zum Ausloggen des Benutzers
  logout() {
    // Sendet eine POST-Anfrage zum Logout-Endpunkt und setzt den Benutzer zurück
    return this.iAmService.sendPostRequest(this.backendUrlPath + '/logout', {}).then(() => {
      this.iAmService.iAmUser = { username: "", name: "" };
    });
  }

  // Methode zum Registrieren eines neuen Benutzers
  register(user: RegisterUser) {
    // Sendet eine POST-Anfrage zum Register-Endpunkt mit den Benutzerdaten
    return this.iAmService.sendPostRequest(this.backendUrlPath + '/register', user);
  }

  // Methode zur Überprüfung, ob ein Benutzername verfügbar ist
  isUsernameAvailable(username: string) {
    // Sendet eine GET-Anfrage zum Available-Endpunkt mit dem Benutzernamen
    return this.iAmService.sendGetRequest(this.backendUrlPath + `/available`, { username: username });
  }

  // Methode zur Überprüfung, ob der Benutzer authentifiziert ist
  isAuthenticated(): boolean {
    // Überprüft, ob der Benutzername im IAmService gesetzt ist
    return !!this.iAmService.iAmUser.username;
  }
}
