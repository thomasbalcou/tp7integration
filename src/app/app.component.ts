import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tableaux;
  constructor(private http: HttpClient) { }

  ngOnInit() {    
    this.getTableaux(); 
  }
  getTableaux(){
    this.http
      .get<any[]>('/api/tableau/all')
      .subscribe(
        (response) => {
          this.tableaux = JSON.stringify(response);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
   
  }
  onSubmit(form: NgForm) {
    this.http
    .post('/api/tableau/nouveau', form.value)
    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
}

  
  
}
