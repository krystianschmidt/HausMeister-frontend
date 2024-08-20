import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouteReuseStrategy} from "@angular/router";

import {IonicModule, IonicRouteStrategy} from "@ionic/angular";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {XhrInterceptor} from "./providers/xhr-interceptor";
import {initApp} from "./providers/initApp";
import {AuthenticationService} from "../services/authentication/authentication.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    {provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true
    },{
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [AuthenticationService]
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
