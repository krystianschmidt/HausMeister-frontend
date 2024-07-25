import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {IAmService} from "../../services/authentication/i-am.service";


@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {

  constructor(public iAm: IAmService, public router: Router) {}

  canActivate() {

    if (this.iAm.iAmUser.username) {
      this.router.navigate(['/']);
      return false;
    }
    return true;

  }

}
