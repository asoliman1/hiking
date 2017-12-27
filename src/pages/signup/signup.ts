import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { FirebaseService } from "../../app/firebase-service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';



@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class signupPage {
    public data: any;
    
    registerForm: FormGroup;
    user = {
        name : "",
        email : "",
        mobile : "",
        comment : "",
        city:"",
        build_name:""
    } ;
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public api: FirebaseService, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
        this.navCtrl = navCtrl;

    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: [this.user.name, Validators.required],
            email: [this.user.email, Validators.required],
            mobile: [this.user.mobile, Validators.required],
            city: [this.user.city,Validators.required],
            build_name: [this.user.build_name,Validators.required],
            comment : [this.user.comment,Validators.required]

        });
    }


    register() {
        this.user = this.registerForm.value;
        let loading = this.loadingCtrl.create({
            spinner:"bubbles"
            
        });
            loading.present().then(() => {
                let url = "reg/owner?"
                    + "name=" + this.user.name
                    + "&email=" + this.user.email
                    + "&mobile=" + this.user.mobile
                    + "&city=" + this.user.city
                    + "&build_name=" + this.user.build_name
                    + "&comment=" + this.user.comment
                this.api.post(url, this.user).then(data => {
                    loading.dismiss();
                    this.data = data;
                    if(this.data.status){
                         this.api.showToast(this.data.user)
                         this.navCtrl.setRoot(HomePage)
                    }
                    else{
                        this.api.showalert("",this.data.errors);
                    }
                })
            })
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
