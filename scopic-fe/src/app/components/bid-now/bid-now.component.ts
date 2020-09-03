import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item/item.service';
import { BidService } from '../../services/bid/bid.service';
import { Item } from './../../models/Item';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bid } from './../../models/Bid';

@Component({
  selector: 'app-bid-now',
  templateUrl: './bid-now.component.html',
  styleUrls: ['./bid-now.component.css']
})
export class BidNowComponent implements OnInit {

  itemAddForm: FormGroup;
	index: string;
	itemDetail: any;
  json: Item;
  user: any;
  hasStarted = true;
  hasNotFinished = true;
	displayedColumns: string[] = ['bidder', 'price'];
  dataS: MatTableDataSource<Bid>;
  duration: any;
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
    
    let res = JSON.parse(sessionStorage.getItem('userData'));
    this.user = res;
	}

	ngOnInit() {
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
		this.BidService.registerBid(this.itemAddForm.value, this.json)
      .subscribe();
    this.dataS.data.push(this.itemAddForm.value)
    setTimeout(() => {
      this.dataS.paginator = this.paginator;
    });
    let value = this.itemAddForm.value["price"];
    this.itemAddForm = this.formBuilder.group({
      price: [value+1, [Validators.required, Validators.min(value+1)]],
      bidder: [this.user["email"], [Validators.required]],
    });
  }

  public counter(date: Date) {
    var rightNow = new Date();
    var finishTime = new Date(date);
    this.duration = rightNow.valueOf() - finishTime.valueOf();
  }
  
  public compareDates(date1: Date, date2: Date): number
  {
    let d1 = new Date(date1); let d2 = new Date(date2);

    let same = d1.getTime() === d2.getTime();
    if (same) return 0;
    if (d1 > d2) return 1;
    if (d1 < d2) return -1;
  }

  checkDates(dateStart, dateFinish) {
    if(this.compareDates(dateStart, new Date())==1) {
      this.hasStarted = false;
    }
    if(this.compareDates(dateFinish, new Date())==-1) {
      this.hasNotFinished = false;
    }
  }

  createTimer(date) {
    let timer = setInterval(()=>{
      let duration = new Date(date).getTime()-new Date().getTime();
      let days = Math.floor(duration/(1000*60*60*24));
      let hours = Math.floor((duration%(1000*60*60*24))/(1000*60*60));
      let minutes = Math.floor((duration%(1000*60*60))/(1000*60));
      let seconds = Math.floor((duration%(1000*60))/(1000));
      this.duration = days+"d "+hours+"h "+minutes+"m "+seconds+"s"
      if(duration<0) {
        clearInterval(timer);
      }
    }, 1000)
  }

	createForm(data) {
    this.checkDates(data["start"], data["finish"]);
    this.createTimer(data["finish"]);
    this.json = data;
		if (data === null) {
			this.itemAddForm = this.formBuilder.group({
        price: [0, [Validators.required]],
        bidder: [this.user["email"], [Validators.required]],
			});
		} else {
			this.itemAddForm = this.formBuilder.group({
        price: [data["maxBid"]+1, [Validators.required, Validators.min(data["maxBid"]+1)]],
        bidder: [this.user["email"], [Validators.required]],
			});
		}
	}
}
