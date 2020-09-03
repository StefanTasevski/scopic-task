import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { ItemService } from './services/item/item.service';

// Components
import { IndexComponent } from './components/index/index.component';
import { ItemListComponent } from './components/items/list/list.component';
import { ItemAddComponent } from './components/items/add/add.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BidNowComponent } from './components/bid-now/bid-now.component';

@NgModule({
	declarations: [
		IndexComponent,
		ItemListComponent,
		ItemAddComponent,
		LoginComponent,
		HomeComponent,
		BidNowComponent,
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MaterialModule,
	],
	providers: [AuthService, UserService, ItemService],
	bootstrap: [IndexComponent]
})

// enableProdMode();

export class AppModule { }
