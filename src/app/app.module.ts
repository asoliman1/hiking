import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { signupPage } from '../pages/signup/signup';
import { StoresPage } from "../pages/stores/stores";
import { ProductshowPage } from "../pages/productshow/productshow";
import { ContactPage } from "../pages/contact/contact";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { FirebaseService } from "./firebase-service";
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SearchPage } from "../pages/search/search";
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree } from '@ionic-native/admob-free';
import { notificationsPage } from '../pages/notifications/notifications';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    ProductshowPage,
    StoresPage,
    AboutPage,
    HomePage,
    SearchPage,
    signupPage,
    notificationsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        scrollAssist: false, 
        autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    ProductshowPage,
    StoresPage,
    AboutPage,
    HomePage,
    SearchPage,
    signupPage,
    notificationsPage
  ],
  providers: [
    AdMobFree,
    SocialSharing,
    PhotoViewer,
    InAppBrowser,
    FirebaseService,
    Network,
    OneSignal,
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
