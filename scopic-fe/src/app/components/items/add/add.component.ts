import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ValidationService } from '../../../services/config/config.service';
import { BookService } from '../../../services/book/book.service';

@Component({
	selector: 'app-book-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})

export class BookAddComponent implements OnInit {
	bookAddForm: FormGroup;
	index: string;
	bookDetail: any;
	json: any;

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private BookService: BookService) {

		this.route.queryParams.subscribe(params =>{
			this.json = params["record"];
			console.log(params["record"]);
		})

		this.route.params.subscribe(params => {
			this.index = params['id'];
			console.log(this.index);
			if (this.index && this.index !== null && this.index !== undefined) {
				this.createForm(this.json);
			} else {
				this.index=null;
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
	}

	register() {
		if (this.index && this.index !== null && this.index !== undefined) {
			this.bookAddForm.value.id = this.index;
		} else {
			this.index = null;
		}
		this.bookAddForm.value.tags = this.bookAddForm.value.tags.split(", ");
		this.BookService.registerBook(this.bookAddForm.value, this.index)
			.subscribe(o => this.router.navigate(['/']),error => console.error(error));
	}

	createForm(data) {
		if (data === null) {
			this.bookAddForm = this.formBuilder.group({
				name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				year: ['', [Validators.required, ValidationService.checkLimit(0, 2020)]],
				tags: ['']
			});
		} else {
			this.bookAddForm = this.formBuilder.group({
				name: [JSON.parse(data)["name"], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				author: [JSON.parse(data)["author"], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				year: [JSON.parse(data)["year"], [Validators.required, ValidationService.checkLimit(0, 2020)]],
				tags: [JSON.parse(data)["tags"], [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
			});
		}
	}

}