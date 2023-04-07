import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  isSignedIn=false
  constructor(private router:Router,public firebaseService:FirebaseService)
  {}

  ngOnInit(){
    if(localStorage.getItem('user')!=null)
    this.isSignedIn=true
    else
    this.isSignedIn=false
  }

  async onSignup(email:string,password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn=false

    alert("Your Registration Success")
  }


  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.goToPage('Input')
    this.isSignedIn=true
    
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
}
