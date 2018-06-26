import { Component, OnInit } from '@angular/core';
import { select } from "ng2-redux";
import { IAppState } from "./../redux";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    //@select("counter") counter;
    //@select(["app","counter"]) counter;
    @select((s:IAppState)=>s.counter) counter;

    constructor() { }

    ngOnInit() {
    }

}
