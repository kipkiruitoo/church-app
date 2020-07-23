import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  elementType = "url";
  value = "Techiediaries";
  constructor(
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidPermissions
        .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
        .then(
          (result) => console.log("Has permission?", result.hasPermission),
          (err) =>
            this.androidPermissions.requestPermission(
              this.androidPermissions.PERMISSION.CAMERA
            )
        );

      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.GET_ACCOUNTS,
      ]);
    });
  }
}
