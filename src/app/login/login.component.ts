import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

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
    this.isSignedIn=true
  }


  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn){
    this.isSignedIn=true
    }
    if(!this.firebaseService.signin(email,password)){
      console.log("not")
    }
  }

  handlelogout(){
    this.isSignedIn=false

  }


  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
}
