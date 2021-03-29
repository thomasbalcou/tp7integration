import { Subject } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FicheService {

    private fiches = [];

    fichesSubject = new Subject<any[]>();
      
      constructor(private httpClient: HttpClient) { }

      emitFichesSubject() {
        this.fichesSubject.next(this.fiches.slice());
      }

      getFichesFromServer() {
        this.httpClient
          .get<any[]>('https://database-cf4c3-default-rtdb.europe-west1.firebasedatabase.app/.json')
          .subscribe(
            (response) => {
              this.fiches = response;
              this.emitFichesSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
      }
}
    