import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBook } from 'src/app/IBook';
import { Observable } from 'rxjs';

@Injectable()
export class BookService {

  private URL = "http://localhost:4000/api"

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.URL+"/books");
  } 

  registerBook(data, index) { 
    if (index == null) {
      data.id = this.generateRandomID();
      return this.http.post(this.URL+"/books", JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    } else {
      return this.http.put(this.URL+"/books/"+index, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
  }

  deleteBook(index: string) {
    return this.http.delete<void>(this.URL+"/books/"+index);
  }

  generateRandomID() {
    const x = Math.floor((Math.random() * Math.random() * 9999));
    return x;
  }

}