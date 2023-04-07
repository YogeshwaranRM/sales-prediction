import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-csv-import',
    templateUrl: './csv-import.component.html',
    styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit{

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
  file: File|null=null;

  @Output() isLogout =new EventEmitter<void>()

  constructor(public firebaseService:FirebaseService,private http: HttpClient,private router:Router) { }
  formUrl: string='';
  selectedValue1:string=''
  selectedValue2:string=''
  numeric:string=''

  ngOnInit() {
   }

   logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
   
   }


    submit() {
      const url = 'http://127.0.0.1:5000/post-value';
      const data = { value1: this.selectedValue1,value2:this.selectedValue2,value3:this.numeric };
      this.http.post(url, data).subscribe(
        res => console.log(res),
        err => console.log(err),
      );
      alert("data inserted successfully! let's predict")
    }


  getFile(event: any): void {
    this.file = event.target.files[0];
    console.log('file', this.file);
  }
  onSubmit() {
    const formData = { my_selector: this.selectedValue1 };
  }
  uploadFile(): void {
    if (!this.file) {
      console.error('No file selected');
      alert("No files selected")
      return;
    }
  
    let formData = new FormData();
    formData.set("file", this.file);
    this.http.post('http://localhost:5000/fileupload', formData).subscribe((response) => {
      alert("Your file Uploded Successfully")
      console.log('Upload response:', response);
    });
  }
}
