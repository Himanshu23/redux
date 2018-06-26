import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { IAppState, Actions } from "./../redux";
import { AppService } from './../app.service'
import { print } from 'util';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
    loginName:string;
    loginPassword:string;
    registerName:string;
    registerPassword:string;
    registerConfirmPassword:string;
    regErrMsg:string;
    regSuccMsg:string;
    loginErrMsg:string;

    ref_ngRedux:any;
    counter:number;
    store:any

    constructor(private ngRedux:NgRedux<IAppState>, private svc:AppService) {
        //Setting the default value of counter
        this.store = this.ngRedux.getState();
        this.counter = this.store.counter;
        
        //Creating a subscription for counter
        this.ref_ngRedux = this.ngRedux.subscribe(() => {
            this.store = this.ngRedux.getState();
            this.counter = this.store.counter;
            this.regErrMsg = this.store.register.errMsg;
            this.regSuccMsg = this.store.register.succMsg;
            this.loginErrMsg = this.store.register.errMsg;
            console.log("\nSubscription state:" + JSON.stringify(this.store))
        })
    }

    ngOnInit() { }

    ngOnDestroy() { 
        //UnSubscribing store slices
        this.ref_ngRedux.unsubscribe();
        this.ref_ngRedux = null;
    }

    login(){
        this.svc.login({loginName:this.loginName, loginPassword:this.loginPassword})
    }

    register(){
        this.svc.register({registerName:this.registerName, registerPassword:this.registerPassword, registerConfirmPassword: this.registerConfirmPassword})
    }

    increment(){
        this.ngRedux.dispatch({type:Actions.APP_increment});
    }

    decrement(){
        this.ngRedux.dispatch({type:Actions.APP_decrement});
    }

    reset(){
        this.ngRedux.dispatch({type:Actions.APP_reset});
    }

}
