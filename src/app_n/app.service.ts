import { Injectable } from '@angular/core';
import { NgRedux } from "ng2-redux";
import { IAppState, Actions } from "./redux";
import { error } from 'util';

@Injectable()
export class AppService {

  constructor(private ngRedux:NgRedux<IAppState>) { }

  login(data:any){
    this.setToStorage("loginName", data.loginName)
    this.setToStorage("loginPassword", data.loginPassword)

    this.loginSuccessHandler(data);
  }

  private loginSuccessHandler(res){
    this.ngRedux.dispatch({type:Actions.APP_Login, data:{loginName:res.loginName, loginPassword:res.loginPassword}});
  }
  
  register(data:any){
    var registeredUsers = JSON.parse(localStorage.getItem("register") || "[]");
    registeredUsers.push(data);
    if(!registeredUsers.find(da => da.name == data.name))
      { this.setToStorage("register", registeredUsers) }
    else
     this.registerErrorHandler(data);
    }


  private registerSuccessHandler(res){
    console.log(this.getToStorage("register"))
    console.log("res:",res)
    this.ngRedux.dispatch({type:Actions.APP_Register, data:{name:res.registerName, password:res.registerPassword, confirmPassword:res.registerConfirmPassword}});
  }

  private registerErrorHandler(res){
    this.ngRedux.dispatch({type:Actions.APP_Register, 
      data:{name:res.name, password:res.registerPassword, 
      confirmPassword:res.registerConfirmPassword, 
      errMsg: "User already exist"}})}

  private setToStorage(key: string, value: any): void { 
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  }

  private getToStorage(key: string): any { 
    let value = window.localStorage.getItem(key);
    return value;
    //this.successHandler(value)
  }


}
