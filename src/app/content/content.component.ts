import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { IAppState, Actions } from "./../redux";
import { AppService } from './../app.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {
    loginName: string;
    loginPassword: string;
    registerName: string;
    registerPassword: string;
    registerConfirmPassword: string;
    regErrMsg: string;
    regSuccMsg: string;
    loginErrMsg: string;
    login_ngRedux: any;
    reg_ngRedux: any;
    loginSuccess: boolean;

    constructor(private ngRedux: NgRedux<IAppState>, private svc: AppService, private router: Router) {
        this.login_ngRedux = this.ngRedux.select<any>('login') // <- New
            .subscribe((login) => {
                this.loginErrMsg = login.errMsg;
                this.loginSuccess = login.success;
                if (this.svc.activeLogin()) {
                    console.log("gffff");
                    this.router.navigate(['/content-list'])
                }
            });

        this.reg_ngRedux = this.ngRedux.select<any>('register') // <- New
            .subscribe((register) => {
                this.regErrMsg = register.errMsg;
                this.regSuccMsg = register.succMsg;
            });
    }

    ngOnInit() {
        // this.router.navigate(['/content-list'])
    }

    ngOnDestroy() {
        this.login_ngRedux.unsubscribe();
        this.reg_ngRedux.unsubscribe();
    }

    login() {
        this.svc.login({ name: this.loginName, password: this.loginPassword })
    }

    register() {
        this.svc.register({ name: this.registerName, password: this.registerPassword, confirmPassword: this.registerConfirmPassword })
    }
}
