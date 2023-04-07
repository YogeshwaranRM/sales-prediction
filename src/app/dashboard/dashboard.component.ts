import { Component, OnInit, ChangeDetectorRef,EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-dash_board',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  imageSrc: string='';
  image:string="assets/bar_chart.png";
  linechart:string="assets/images/line.png";
  mae:string='';
  mape:string='';
  rmse:string='';
  mse:string='';
  @Output() isLogout =new EventEmitter<void>()
  constructor(public firebaseService:FirebaseService,private dataService: DataService,private http:HttpClient,private router:Router,private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
     this.mae= data[0];
     this.mape=data[1];
     this.rmse=data[2];
     this.mse=data[3];
     this.changeDetectorRef.detectChanges();
    });
    
  }
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    // alert("not work")
   }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
}

