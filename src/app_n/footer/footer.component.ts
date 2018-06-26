import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { IAppState, Actions } from "./../redux";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    ref_ngRedux:any;
    counter:number;
    store:any

    constructor(private ngRedux:NgRedux<IAppState>) {
        //Setting the default value of counter
        this.store = this.ngRedux.getState();
        this.counter = this.store.counter;
        
        //Creating a subscription for counter
        this.ref_ngRedux = this.ngRedux.subscribe(() => {
            this.store = this.ngRedux.getState();
            this.counter = this.store.counter;
            console.log("Subscription called in footer:" + this.counter)
        })
    }

    ngOnInit() { }

    ngOnDestroy() { 
        //UnSubscribing store slices
        this.ref_ngRedux.unsubscribe();
        this.ref_ngRedux = null;
    }
}
