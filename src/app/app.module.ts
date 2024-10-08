import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    AngularFireAuthModule,AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),



  ],

    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
    },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})




export class AppModule {}


