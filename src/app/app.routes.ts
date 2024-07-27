import {mapToCanActivate, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
    canActivate: mapToCanActivate([AuthGuard])
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationModule),
    canActivate: mapToCanActivate([LoginGuard])
  }
];
