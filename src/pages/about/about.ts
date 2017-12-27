import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FirebaseService } from "../../app/firebase-service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  loading:boolean;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public api : FirebaseService) {
  this.about();
  }
  public data : any;
  data1 = null 
  about(){
    this.loading=true
   let url = "page/1";
     this.api.get(url).then(data=>{
      this.data=data;
      this.data1=this.data.page
      this.loading=false;
    }).catch((error) => {
        this.api.showalert("","حدث خطأ برجاء المحاوله مره اخري")
      })
 }
 goBack(){
   this.navCtrl.pop();
 }


}
