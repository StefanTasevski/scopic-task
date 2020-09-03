import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../models/Item'

@Injectable()
export class ItemService {

  user: any;
  headers: any;
  postHeaders: any;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    this.headers = new HttpHeaders(this.user ? {
      authorization : 'Basic ' + btoa(this.user["email"] + ':' + this.user["password"]),
    } : {});
    this.postHeaders = new HttpHeaders(this.user ? {
      authorization : 'Basic ' + btoa(this.user["email"] + ':' + this.user["password"]),
      'Content-Type': 'application/json'
    } : {});
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>("/api/items/get", {headers: this.headers});
  } 

  registerItem(data, index) { 
    if (index == null) {
      return this.http.post("/api/items/create", JSON.stringify(data), {headers: this.postHeaders});
    } 
    else {
      return this.http.put("/api/items/update/"+index, JSON.stringify(data), {headers: this.postHeaders});
    }
  }

  getItem(index): Observable<Item> {
    return this.http.get<Item>("/api/items/get/"+index, {headers: this.headers});
  }

  deleteItem(index) {
    return this.http.delete<void>("/api/items/delete/"+index, {headers: this.headers});
  }

  getPrice(index): Observable<number> {
    return this.http.get<number>("/api/items/price/"+index, {headers: this.headers});
  }
}