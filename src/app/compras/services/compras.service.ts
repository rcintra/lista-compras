import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseUrl = "https://calm-dawn-96113.herokuapp.com/compra";

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get(this.baseUrl).pipe(map((response: any) => {
      return response;
    }));
  }

}
