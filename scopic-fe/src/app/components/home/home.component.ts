import { Component, OnInit } from '@angular/core';
import { Routes ,Router} from '@angular/router';

import { bookListComponent } from '../book/list/list.component';
import { BookAddComponent } from '../book/add/add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
 active:string;
 user:any;
  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.routeChanged(val);
    });
  }

  ngOnInit() {
    let res = JSON.parse(localStorage.getItem('userData'));
    this.user = res["email"];
  }

  routeChanged(val){
    this.active = val.url;
  }

  logOut(){
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}

export const homeChildRoutes : Routes = [
{
  path: '',
  component: bookListComponent
},
{
  path: 'add',
  component: BookAddComponent
},
{
  path: 'update/:id',
  component: BookAddComponent
}
];
