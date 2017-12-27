import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { StoresPage } from "../stores/stores";
import { FirebaseService } from "../../app/firebase-service";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  search1 = {
    search: '',
    area: '',
    city: '',
    type: '',
    price_from:0,
    price_to:'',
    price_type:''
  };
  cityload: boolean;
  srch: boolean;
  data: any;
  areas = [];
  cities= [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public api : FirebaseService) {
    this.getareas();  
    this.search1.price_from=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }



  async search() {
    this.srch = true;
    let url = "search?city_id=" + this.search1.city + "&area_id=" + this.search1.area + "&type_search=" + this.search1.type + "&pfrom=" + this.search1.price_from + "&pto=" + this.search1.price_to + "&price_col=friday" + "&per_page=5" 
    this.api.get(url).then(data => {
      console.log(url)
      this.data = data
      this.srch = false
      if(this.data.builds)
      this.navCtrl.push(StoresPage, this.data.builds)
        
    }).catch((error) => {
        this.api.showalert("","حدث خطأ برجاء المحاوله مره اخري")
      })
  }

  async getareas() {
    this.api.get("all/routes").then(data => {
      this.data = data;
      this.data = this.data.data[0].areas
      this.areas = this.data
    }).catch((error) => {
        this.api.showalert("","حدث خطأ برجاء المحاوله مره اخري")
      })
  }

  search_by_id(id, array): any {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        return array[i];
      }

    }
  }

  getcities() {
    this.cityload=true;
    if (parseInt(this.search1.area) >= 0) {
      let city = this.search_by_id(this.search1.area, this.areas);
      this.cities = city.city;
      if(this.cities.length==0){ 
         let no = {
          name : " ًلا يوجد مدن حاليا"
        }
        this.cities[0]=no
      }
      this.cityload=false
    }
    else { 
    this.cityload=false
    this.api.showalert('', 'لا بد ان تختار المنطفه') 
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

}
