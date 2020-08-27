import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { BookService } from './services/book/book.service';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';

// Components
import { IndexComponent } from './components/index/index.component';
import { bookListComponent } from './components/book/list/list.component';
import { BookAddComponent } from './components/book/add/add.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';




@NgModule({
	declarations: [
		IndexComponent,
		bookListComponent,
		BookAddComponent,
		LoginComponent,
		HomeComponent,
		FilterPipe
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [AuthService, UserService, BookService],
	bootstrap: [IndexComponent]
})

// enableProdMode();

export class AppModule { }
