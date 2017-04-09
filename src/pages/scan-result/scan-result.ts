import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Country } from "./country";

import { Api } from "../../providers/api";
/*
  Generated class for the ScanResult page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scan-result',
  templateUrl: 'scan-result.html'
})
export class ScanResultPage {
  public scannedText: string;
  selectedCountry:Country = new Country(2, 'reason2');
  countries = [
     new Country(1, 'reason1' ),
     new Country(2, 'reason2' ),
     new Country(3, 'reason3' ),
     new Country(4, 'reason4')
  ];

  private data: any;

  constructor(public _nav: NavController,
    private _navParams: NavParams,
    private _api: Api,
    private _loadingController: LoadingController) {}

  ionViewDidLoad() {
    this.scannedText = this._navParams.get("scannedText");
  }

  submitBarcode() {
    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    //Submit Barcode
    this._api.submitBarcode(this.scannedText, this.selectedCountry.id).then((result) => {
      loading.dismiss();
      this.data = result;
      console.log(this.data);
      alert("Barcode Submitted");
      this._nav.pop();
    }, (err) => {
      loading.dismiss();
      // Display submit barcode error code
      alert(err);
    });
  }

}
