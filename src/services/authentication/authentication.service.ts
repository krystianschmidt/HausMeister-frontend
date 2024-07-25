import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAmService} from "./i-am.service";
import {RegisterUser} from "../../app/models/registerUser";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  private readonly backendUrlPath: string = 'auth';


  constructor(private readonly iAmService: IAmService) {
  }


  login(credentials?: any) {
    const headers = new HttpHeaders(credentials ?
      {authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)} :
      {authorization: ''});

    return this.iAmService.loadUser(headers);
  }


  logout(){
    return this.iAmService.sendPostRequest(this.backendUrlPath + '/logout', {}).then(() => {
      this.iAmService.iAmUser = {username:"", name: ""};
    });
  }

  register(user: RegisterUser){
    return this.iAmService.sendPostRequest(this.backendUrlPath + '/register', user);
  }

  isUsernameAvailable(username: string){
    return this.iAmService.sendGetRequest(this.backendUrlPath + `/available`, {username: username})
  }

  isAuthenticated(): boolean {
    return !!this.iAmService.iAmUser.username;
  }
}
