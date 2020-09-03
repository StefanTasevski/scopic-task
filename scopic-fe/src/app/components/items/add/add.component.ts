import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../services/item/item.service';
import { BidService } from '../../../services/bid/bid.service';
import { Item } from './../../../models/Item';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bid } from './../../../models/Bid';

@Component({
	selector: 'app-item-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})

export class ItemAddComponent implements OnInit {
	itemAddForm: FormGroup;
	index: string;
	itemDetail: any;
	json: Item;
	displayedColumns: string[] = ['bidder', 'price'];
	dataS: MatTableDataSource<Bid>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private ItemService: ItemService, private BidService: BidService) {

		this.route.params.subscribe(params => {
			this.index = params['id'];
			if (this.index && this.index !== null && this.index !== undefined) {
				ItemService.getItem(this.index)
					.subscribe(data => this.createForm(data));
			} else {
				this.index=null;
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
		if(this.index!=null)
			this.getBidList();
	}

	getBidList() {
		this.BidService.getAllBids(this.index)
			.subscribe(data => {
				this.dataS = new MatTableDataSource<Bid>(data);
				this.dataS.paginator = this.paginator
			}, (error) => console.error(error))
	}


	register() {
		if (this.index && this.index !== null && this.index !== undefined) {
			this.itemAddForm.value.id = this.index;
		} else {
			this.index = null;
		}
		this.ItemService.registerItem(this.itemAddForm.value, this.index)
			.subscribe(o => this.router.navigate(['/home']),error => console.error(error));
	}

	createForm(data) {
		if (data === null) {
			this.itemAddForm = this.formBuilder.group({
				name: ['', [Validators.required, Validators.maxLength(255)]],
				description: ['', [Validators.required, Validators.maxLength(255)]],
				start: ['', [Validators.required]],
				finish: ['', [Validators.required]]
			});
		} else {
			this.itemAddForm = this.formBuilder.group({
				name: [data["name"], [Validators.required, Validators.maxLength(255)]],
				description: [data["description"], [Validators.required, Validators.maxLength(255)]],
				start: [data["start"], [Validators.required]],
				finish: [data["finish"], [Validators.required]]
			});
		}
	}

}