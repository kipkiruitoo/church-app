import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery/ngx";

import { Toast } from "@ionic-native/toast/ngx";
import { HTTP } from "@ionic-native/http/ngx";

import { FormsModule } from "@angular/forms";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Toast,
    HTTP,
    AndroidPermissions,
    Base64ToGallery,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
