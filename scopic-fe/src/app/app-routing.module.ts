import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './components/login/login.component';
import { RouteGuardService } from './services/admin_guard/route-guard.service'
import { ItemAddComponent } from './components/items/add/add.component';
import { BidNowComponent } from './components/bid-now/bid-now.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: homeChildRoutes,
    canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add',
    component: ItemAddComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'update/:id',
    component: ItemAddComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'bid/:id',
    component: BidNowComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
