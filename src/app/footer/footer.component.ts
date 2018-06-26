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
    }

    ngOnInit() { }

    ngOnDestroy() { 
    }
}
