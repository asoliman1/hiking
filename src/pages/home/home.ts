import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FirebaseService } from "../../app/firebase-service";
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { ProductshowPage } from "../productshow/productshow";
import { SearchPage } from "../search/search";
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading_new: boolean;
  loading_special: boolean;
  loading_services: boolean;
  i: number = 1;
  type = 'new';
  data: any;
  stores = [];
  stores_special = [];
  nearbys = [];
  location = {};
  current_page_new: String;
  current_page_special: String;
  current_page_services: String;
  photo: String = this.api.photo;

  constructor(public navCtrl: NavController, public api: FirebaseService, public loadingCtrl: LoadingController, public geolocation: Geolocation,private admobFree: AdMobFree) {
    this.getbuild();
    this.showad()
  }
  
  showad(){
  const bannerConfig: AdMobFreeBannerConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: true,
    autoShow: true
   };

   this.admobFree.banner.config(bannerConfig);
   
   this.admobFree.banner.prepare()
     .then(() => {
       // banner Ad is ready
       // if we set autoShow to false, then we will need to call the show method here
     })
     .catch(e => console.log(e));

}
  async getbuild() {
    this.loading_new = true;
    await this.api.get("all/build?spcial_build=no&per_page=3").then(data => {
      this.data = data;
      this.current_page_new = this.data.build.next_page_url;
      this.data = this.data.build.data
      this.stores = this.data
      this.loading_new = false;

    }).catch((error) => {
      this.api.showalert("", "حدث خطأ برجاء المحاوله مره اخري")
    })
  }

  async getbuildSpecial() {
    this.loading_special = true;
    await this.api.get("all/build?per_page=3&spcial_build=yes").then(data => {
      this.data = data;
      this.current_page_special = this.data.build.next_page_url;
      this.data = this.data.build.data
      this.stores_special = this.data
      this.loading_special = false;

    }).catch((error) => {
      this.api.showalert("", "حدث خطأ برجاء المحاوله مره اخري")
    })
  }

   getnearby() {
    this.loading_services = true;
     this.api.get("all/build").then(data=>{
      this.data = data;
      this.data = this.data.build.data
      this.searchbylocation(this.data);
    }).catch((error) => {
      this.api.showalert("", "حدث خطأ برجاء المحاوله مره اخري")
    })
  }


  gosearch() {
    this.navCtrl.push(SearchPage);
  }


  searchbylocation(locations) {
    let coord = {
      lat: 0,
      lng: 0
    }
    let options:GeolocationOptions={
      timeout:30000
    }
    this.geolocation.getCurrentPosition(options).then((resp) => {
      coord.lat = resp.coords.latitude
      coord.lng = resp.coords.longitude
      this.nearbys = this.api.applyHaversine(locations, coord)
      console.log(this.nearbys)
      this.loading_services = false;      
    }).catch(err=>{
      this.api.showalert("","نرجو تشغيل الجي بي اس") ;
      this.loading_services = false;      
      
    })
  }

  segmentChanged(){
    if(this.type=="special"){
      if(this.stores_special.length==0)
      this.getbuildSpecial();
      
    }
    else if(this.type=="nearby"){
      if(this.nearbys.length==0)      
    this.getnearby();
    
    }
  }

  doInfinite(infiniteScroll) {
    switch (this.type) {
      case "new":
        if (this.current_page_new!=null) {
          this.api.get(this.current_page_new.substring(27)+"&per_page=3&spcial_build=no").then(data => {
            this.data = data;
            this.current_page_new=this.data.build.next_page_url
            this.data = this.data.build.data
            this.data.forEach(element => {
              this.stores.push(element)
            });
            infiniteScroll.complete();

          }).catch((error) => {
            this.api.showalert("", "حدث خطأ برجاء المحاوله مره اخري")
            infiniteScroll.complete();

          })
        } else
          infiniteScroll.complete();
        break;
      case "special":
        if (this.current_page_special !=null) {
          this.api.get(this.current_page_special.substring(27)+"&per_page=3&spcial_build=yes").then(data => {
            this.data = data;
            this.current_page_special=this.data.build.next_page_url
            this.data = this.data.build.data
            this.data.forEach(element => {
              console.log(element)
              this.stores_special.push(element)
            });
            infiniteScroll.complete();

          }).catch((error) => {
            this.api.showalert("", "حدث خطأ برجاء المحاوله مره اخري")
            infiniteScroll.complete();

          })
        } else
          infiniteScroll.complete();
        break;

    }


  }

doRefresh(refresher){
  if(this.type=="new"){
    this.getbuild();
    setTimeout(()=>{
    refresher.complete()
    },3000)
  }
  else if(this.type="special"){
    this.getbuildSpecial();
    setTimeout(()=>{
      refresher.complete()
      },3000)
    
  }else{
    this.getnearby();
    setTimeout(()=>{
      refresher.complete()
      },3000)
    
  }
}

  gotoproduct(product) {
    this.navCtrl.push(ProductshowPage, product);
  }


}