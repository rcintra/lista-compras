import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { Compra } from '../model/compra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private baseUrl = "https://calm-dawn-96113.herokuapp.com/compra";

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Compra[]>(this.baseUrl)
    .pipe(
      first(),
      tap(compras => console.log(compras))
    );
  }

  addItem(data: Compra) {
    return this.http.post(this.baseUrl, data).pipe(map(
      (response: any) => {
        return response;
      }
    ))
  }

  updateItem(id: string, compras: Compra[]) {
    return this.http.put(`${this.baseUrl}/${id}`, compras);
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
