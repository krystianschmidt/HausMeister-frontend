import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton, NavController} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton],
})
export class Tab1Page {



  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
  ) {}

  logout() {
    // Perform logout logic here
    this.authService.logout().then(() => {
      this.navCtrl.navigateRoot('/auth/login');
    });
  }

}
