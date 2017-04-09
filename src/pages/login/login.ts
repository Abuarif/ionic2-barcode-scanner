import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from "../../providers/api";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public newUser = {
    serverPath:'',
    email: '',
    password: ''
  };
  public loginFormControl: FormGroup;
  private data: any;

  constructor(
    private _nav: NavController,
    public navParams: NavParams,
    private _loadingController: LoadingController,
    private _formBuilder: FormBuilder,
    private _api: Api) {
      // Create FormControl to validate fields
    this.loginFormControl = new FormGroup({
      serverPath: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {

    // Validation
    if (!this.loginFormControl.valid) {
      alert("Invalid fields!");
      return;
    }

    let loading = this._loadingController.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.present();

    //Take the values from  the form control
    this.newUser.serverPath = this.loginFormControl.get("serverPath").value;
    this.newUser.email = this.loginFormControl.get("email").value.trim();
    this.newUser.password = this.loginFormControl.get("password").value;

    //Sign in
    this._api.signin(this.newUser.serverPath, this.newUser.email, this.newUser.password).then((result) => {
      loading.dismiss();
      this.data = result;
      console.log(this.data);
      // Save token and server path to localStorage
      localStorage.setItem('token', this.data.token);
      localStorage.setItem('serverPath', this.newUser.serverPath);
      // Close login page after successful signin
      this._nav.pop();
    }, (err) => {
      loading.dismiss();
      // Display signin error code
      alert(err);
    });
  }

}
