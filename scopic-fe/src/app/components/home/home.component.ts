import { Component, OnInit } from '@angular/core';
import { Routes ,Router} from '@angular/router';

import { ItemListComponent } from '../items/list/list.component';
import { ItemAddComponent } from '../items/add/add.component';
import { BidNowComponent } from '../bid-now/bid-now.component';

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
    let res = JSON.parse(sessionStorage.getItem('userData'));
    this.user = res["email"];
  }

  routeChanged(val){
    this.active = val.url;
  }

  logOut(){
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}

export const homeChildRoutes : Routes = [
{
  path: '',
  component: ItemListComponent
},
{
  path: 'add',
  component: ItemAddComponent
},
{
  path: 'update/:id',
  component: ItemAddComponent
},
{
  path: 'bid/:id',
  component: BidNowComponent
}
];
