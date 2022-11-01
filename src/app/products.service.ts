import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  KEY: string = 'sdsdvv426621'
  url: string = './assets/json/menu.json'

  getData(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.url, { headers: { 'authlization': `Bearer ${this.KEY}` } })
  }
}
