// import { Component } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';

// @Component({
//   selector: 'app-csv-import',
//   templateUrl: './csv-import.component.html',
//   styleUrls: ['./csv-import.component.css']
// })
// export class CsvImportComponent {
//   path :String=''
//   name:String=''

//   constructor(private af:AngularFireStorage){}
//   upload($event:any){
//       this.path=$event.target.files[0]
//       this.name=$event.target.files[0].name
//   }
//   uploadFile(){
//     console.log(this.path)

//     this.af.upload("/file name :"+this.name+this.path,this.path)
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient,private router:Router) { }
  formUrl: string='';
  selectedValue1:string=''
  selectedValue2:string=''
  numeric:string=''

  ngOnInit() {
   }

    submit() {
      const url = 'http://127.0.0.1:5000/post-value';
      const data = { value1: this.selectedValue1,value2:this.selectedValue2,value3:this.numeric };
      this.http.post(url, data).subscribe(
        res => console.log(res),
        err => console.log(err),
      );
      alert("data inerted successfully! let's predict")
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
