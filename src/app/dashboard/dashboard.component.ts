import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash_board',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  imageSrc: string='';
  image:string="assets/bar_chart.png";
  linechart:string="assets/linechart/line.png";
  mae:string='';
  mape:string='';
  rmse:string='';
  mse:string='';

  constructor(private dataService: DataService,private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
     this.mae= data[0];
     this.mape=data[1];
     this.rmse=data[2];
     this.mse=data[3];
    });
    
  }
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
}

