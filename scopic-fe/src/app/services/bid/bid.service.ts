import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bid } from './../../models/Bid'
import { Item } from 'src/app/models/Item';

@Injectable({
  providedIn: 'root'
})
export class BidService {

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

  getAllBids(index): Observable<Bid[]> {
    return this.http.get<Bid[]>("api/bids/get/"+index, {headers: this.headers});
  } 

  registerBid(value: any, json: Item) {
    return this.http.post("/api/bids/create/"+json.id, JSON.stringify(value), {headers: this.postHeaders});
  }

}
