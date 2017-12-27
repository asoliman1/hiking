import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseService } from "../../app/firebase-service";


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class notificationsPage {
  notifications = [];
  data: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: FirebaseService, public loadingCtrl: LoadingController) {
    this.getnotifiactions();
  }

  async getnotifiactions() {
    let url = "notfication/system"
    let loading = this.loadingCtrl.create({
      spinner:"bubbles"      
    });
    loading.present().then(() => {
      this.api.get(url).then(data => {
        this.data = data;
        this.data=this.data.data.data;
        this.notifications = this.data
        loading.dismiss()
      }).catch((error) => {
        loading.dismiss();        
        this.api.showalert("","حدث خطأ برجاء المحاوله مره اخري")
      })
    })
  }

  goBack() {
    this.navCtrl.pop();
  }
   doRefresh(refresher) {
     this.getnotifiactions()
    refresher.complete();
   
  }

}
