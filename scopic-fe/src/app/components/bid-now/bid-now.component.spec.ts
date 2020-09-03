import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidNowComponent } from './bid-now.component';

describe('BidNowComponent', () => {
  let component: BidNowComponent;
  let fixture: ComponentFixture<BidNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
