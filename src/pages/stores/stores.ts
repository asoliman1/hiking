import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseService } from "../../app/firebase-service";
import { ProductshowPage } from "../productshow/productshow";

@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  counts: String;
  next_page: String;
  data: any;
  stores = [];
  photo: String = this.api.photo ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: FirebaseService, public loadingCtrl: LoadingController) {
    this.stores = this.navParams.data.data;
    this.next_page=this.navParams.data.next_page_url
    this.counts=this.navParams.data.total
  }


  gotoproductsofstore(product) {
    this.navCtrl.push(ProductshowPage , product)
  }

  goBack() {
    this.navCtrl.pop();
  }
  
  doInfinite(infiniteScroll) {
    if(this.next_page!=null){
      this.api.get(this.next_page.substring(27)+"&per_page=5").then(data=>{
        this.data=data;
        this.next_page=this.data.builds.next_page_url;
        this.data.builds.data.forEach(element => {
            this.stores.push(element)
        });
      infiniteScroll.complete();
      
      })
    }else
      infiniteScroll.complete();
  }

}
