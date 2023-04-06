import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CsvImportComponent } from './csv-import/csv-import.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {path:'Login', component:LoginComponent},
  {path:'Register', component:RegistrationComponent},
  {path:'Input',component:CsvImportComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
