import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../../services/item/item.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Item } from 'src/app/models/Item';

@Component({
	selector: 'app-item-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
})

export class ItemListComponent implements OnInit {
	itemList: any;
	itemListData: any;
	errorMessage: any;
	role: any;
	displayedColumns: string[] = ['name', 'description','price', 'details'];
	dataS: MatTableDataSource<Item>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private ItemService: ItemService) {
		let res = JSON.parse(sessionStorage.getItem('userData'));
		this.role = res["role"];
	}
	 
	ngOnInit() {
		this.getItemList();
	}

	getItemList() {
		this.ItemService.getAllItems()
			.subscribe(data => {
				this.dataS = new MatTableDataSource<Item>(data);
				this.dataS.paginator = this.paginator;
			}, (error) => console.error(error))
	}

	deleteItem(index: string, rowId) {
		if(this.role=="ADMIN") {
			const answer = confirm('Are you sure?');
			if (answer === true) {
				const itemDelete = this.ItemService.deleteItem(index).subscribe();
				this.dataS.data.splice(rowId, 1);
				setTimeout(() => {
					this.dataS.paginator = this.paginator;
				});
			}
		}
	}

	applyFilter(filterValue: string) {
		this.dataS.filter = filterValue.trim().toLowerCase();
	}
}
