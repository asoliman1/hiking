import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FirebaseService } from "../../app/firebase-service";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { InAppBrowser } from "@ionic-native/in-app-browser";

declare var google;


@Component({
  selector: 'page-productshow',
  templateUrl: 'productshow.html',
})
export class ProductshowPage {
  @ViewChild('map') mapElement: ElementRef; 
  more:boolean=false; 
  product: any;
  photo: String;
  photoUrl:String = this.api.photo;
  departments = [];
  data:any;
  map: any;
  marker: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  coords: {
    latitude:Number,
    longitude:Number
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public api: FirebaseService,public alertCtrl : AlertController,private photoViewer: PhotoViewer,private iab: InAppBrowser) {
    this.product = this.navParams.data;
    this.photo = this.api.photo + this.product.photo;
    
  }
  
  ionViewWillLoad(){
    this.initMap();    
  }
  

  initMap() {
    let latt,lngg;
    latt=this.product.location_rest_latitude*1;
    lngg=this.product.location_rest_longitude*1;
   
    if(latt!=null&&lngg!=null){     
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: { lat: latt, lng: lngg }
    });
    this.marker = new google.maps.Marker({
      position: { lat: latt, lng: lngg },
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });
    this.directionsDisplay.setMap(this.map);
  }
  }

  showFullscreen(photo){
    this.photoViewer.show(photo);    
  }

  report(){
    let prompt = this.alertCtrl.create({
      title: 'ابلاغ عن مخالفه',
      inputs: [
        {
          name: 'title',
          placeholder: 'برجاء ادخال العنوان'
        },
        {
          name: 'content',
          placeholder: 'برجاء ادخال البلاغ'
        },
      ],
      buttons: [
        {
          text: 'الغاء',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ارسال',
          handler: data => {
            let url = "report?&build_id="+this.product.id+"&content="+data.content+"&title="+data.title;
            this.api.post(url,"").then(data=>{
              this.data=data;
              if(this.data.status)
                this.api.showalert("","تم اضافه البلاغ بنجاح");
              else
                this.api.showalert("",this.data.errors)
            })
          }
        }
      ]
    });
    prompt.present();
   
  }

  gotosocial(id){
    switch(id) { 
    case  "facebook" :
    this.iab.create('https://facebook.com/'+this.product.user_id.facebook);
    break;
    case  "youtube" :
    this.iab.create('https://youtube.com/');
    
    break;
    case  "instgram" :
    this.iab.create('https://instagram.com/'+this.product.user_id.instagram);
    
    break;
    case  "google_plus" :
    this.iab.create('https://plus.google.com/');
    
    break;
    case  "twitter" :
    this.iab.create('https://twitter.com/'+this.product.user_id.twitter);
    
    break;
    }
  }

   goBack(){
   this.navCtrl.pop();
 }


}
