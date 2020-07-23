import { Component } from "@angular/core";
import { Toast } from "@ionic-native/toast/ngx";
import {
  BarcodeScannerOptions,
  BarcodeScanner,
} from "@ionic-native/barcode-scanner/ngx";
import { ChurchService } from "../church.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  encodeData: any;
  scannedData: {};
  stringdata: any;
  stringArray: any;
  name: any;
  location: any;
  gender: any;
  member: any;
  seatnumber: any;
  phone: any;
  barcodeScannerOptions: BarcodeScannerOptions;
  scanData: any;
  yob: any;
  options: BarcodeScannerOptions;
  loading: any;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private churchservice: ChurchService,
    public loadingCtrl: LoadingController
  ) {
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true,
    };
    
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log("Loading dismissed!");
  }
  scan() {
    this.options = {
      prompt: "Scan the Church QR Code ",
    };
    this.barcodeScanner.scan(this.options).then(
      (barcodeData) => {
        console.log(barcodeData);
        this.scanData = barcodeData;
        this.stringdata = JSON.stringify(this.scanData.text.replace(/\n/g, ""));
        this.stringArray = this.stringdata.split(",");
        this.name = this.stringArray[1];
        this.phone = this.stringArray[2];
        this.location = this.stringArray[5];
        this.gender = this.stringArray[4];
        this.yob = this.stringArray[6].replace('"', " ");
        this.toast
          .show(JSON.stringify(this.stringArray), "9000", "center")
          .subscribe((toast) => {
            console.log(toast);
          });
        // this.name = this.scanData[0];
      },
      (err) => {
        console.log("Error occured : " + err);
      }
    );
  }
  encodeText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        (encodedData) => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        (err) => {
          console.log("Error occured : " + err);
        }
      );
  }

  save() {
    this.presentLoading();
    this.member = {
      name: this.name,
      location: this.location,
      gender: this.gender,
      seatnumber: this.seatnumber,
      phone: this.phone,
      yob: this.yob,
    };

    this.churchservice.savemember(this.member).then(async (response) => {
      this.toast
        .show("Successfully Saved", "9000", "center")
        .subscribe((toast) => {
          // console.log(toast);
        });
      await this.loading.dismiss();
    });
    // console.log(this.member);
  }
}
