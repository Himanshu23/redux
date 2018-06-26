import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { IAppState } from "./../redux";
import { AppService } from './../app.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    //@select("counter") counter;
    //@select(["app","counter"]) counter;
    private activeUser; 
    private store;
    private ref_ngRedux;

    constructor(private ngRedux:NgRedux<IAppState>, private svc:AppService,private router: Router) {
      //Setting the default value of counter
      this.store = this.ngRedux.getState();
      this.ref_ngRedux = this.ngRedux.subscribe(() => {
          this.activeUser = this.svc.activeLogin();   
      })
  }

   private logOut(){
     this.svc.logOut();
     this.router.navigate(['/home']) ;
    }

    ngOnInit() {
     this.activeUser = this.svc.activeLogin();
    
    }

}
