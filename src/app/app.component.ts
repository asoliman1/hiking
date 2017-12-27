import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, LoadingController, Events, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { HomePage } from "../pages/home/home";
import { OneSignal } from '@ionic-native/onesignal';
import { ContactPage } from "../pages/contact/contact";
import { Network } from "@ionic-native/network";
import { FirebaseService } from "./firebase-service";
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { signupPage } from '../pages/signup/signup';
import { notificationsPage } from '../pages/notifications/notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  name: string = "Hiking";
  rootPage: any = HomePage;
  data: any;
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private oneSignal: OneSignal, private network: Network, menu: MenuController, public api: FirebaseService,public loadingCtrl:LoadingController,public events: Events,private socialSharing: SocialSharing,public iap:InAppBrowser,public mc:ModalController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.shownotification();
    this.checknetwork();
    });

  }
  checknetwork(){
    this.network.onDisconnect().subscribe(()=>{
      alert('برجاء تشغيل الانترنت و اعاده فتح البرنامج')
      this.platform.exitApp();
    })
  }
  
  shownotification(){
    this.oneSignal.startInit('fa0b956b-2377-4aa9-91cf-0d8d1eb62f45', '903686849183');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();
      this.oneSignal.getIds().then(data=>{
        let url = "update/account?api_token=" + localStorage.getItem(this.api.tokenStr)
        + "onesiginal_id=" + data.userId;
      this.api.post(url, data.userId).then(data => {})
      })
  }

  itemSelected(item) {
    switch (item) {

      case 1:
        this.nav.setRoot(HomePage);
        break;
      case 3:
      this.iap.create('http://217.182.113.163/~hiking2/store/login');
        break;
      case 2:
    this.nav.push(signupPage)
        break;
      case 5:
      if(this.platform.is('android'))
      this.socialSharing.share('https://play.google.com/store/apps/details?id=com.imo.android.imoimbeta');
      else    
      this.socialSharing.share("hiking","hiking");
        break;
      case 6:
        this.nav.push(AboutPage);      
        break;
      case 4:
        this.nav.push(ContactPage);
        break;
        case 7:
        this.nav.push(notificationsPage);
        break

    }
  }
 

}
