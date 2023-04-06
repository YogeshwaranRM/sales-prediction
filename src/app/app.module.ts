import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CsvImportComponent } from './csv-import/csv-import.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { FirebaseService } from './services/firebase.service';
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CsvImportComponent,
    DashboardComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD494hz2imh7OGaNE8w9hay2Y7svSNZbBk",
      authDomain: "sales-forecasting-76877.firebaseapp.com",
      projectId: "sales-forecasting-76877",
      storageBucket: "sales-forecasting-76877.appspot.com",
      messagingSenderId: "741314762904",
      appId: "1:741314762904:web:ec3733829d7f8490fd98ed",
      measurementId: "G-SNQ9VRP3BZ"
    })
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
