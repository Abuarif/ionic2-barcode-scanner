import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from "ionic-native";
import { ScanResultPage } from "../scan-result/scan-result";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  public scannedText: string;
  public buttonText: string;
  public loading: boolean;
  private eventId: number;
  public eventTitle: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    if(!localStorage.getItem("token")) {
      this.navCtrl.push(LoginPage);
    }
    this.eventId = this.navParams.get('eventId');
    this.eventTitle = this.navParams.get('eventTitle');

    this.buttonText = "Scan";
    this.loading = false;
  }

  public scanQR() {
   // this.buttonText = "Loading..";
    this.loading = false;

    BarcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        this.buttonText = "Scan";
        this.loading = false;
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);
      this.goToResult(barcodeData);
    }, (err) => {
      console.log(err);
    });
  }

  private goToResult(barcodeData) {
    this.navCtrl.push(ScanResultPage, {
      scannedText: barcodeData.text
    });
  }

  /*private checkPass(data) {
  }*/
}
