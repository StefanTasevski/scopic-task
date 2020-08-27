import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book/book.service';

@Component({
	selector: 'app-book-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
})

export class bookListComponent implements OnInit {
	bookList: any;
	bookListData: any;
	errorMessage: any;
	constructor(private BookService: BookService) { }
	 
	ngOnInit() {
		this.getbookList();
	}

	getbookList() {
		this.BookService.getAllBooks()
			.subscribe(data => this.bookListData = data, (error) => console.error(error))
		console.log(this.bookListData);
	}

	deleteBook(index: string) {
		const answer = confirm('Are you sure?');
		if (answer === true) {
			const bookDelete = this.BookService.deleteBook(index).subscribe();
			this.getbookList();
		}
	}
}
