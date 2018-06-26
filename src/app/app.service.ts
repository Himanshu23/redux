import { Injectable } from '@angular/core';
import { NgRedux } from "ng2-redux";
import { IAppState, Actions } from "./redux";
import { error } from 'util';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(private ngRedux: NgRedux<IAppState>, private http: HttpClient) { }

  login(data: any) {
    var registeredUsers = JSON.parse(localStorage.getItem("register") || "[]");
    var exist = registeredUsers.find(da =>
      (da.name == data.name && da.password == data.password))
    if (exist) { this.loginSuccessHandler(data) }
    else
      this.loginFailureHandler(data);
  }

  private loginSuccessHandler(res) {
    this.setToStorage("active", res);
    this.ngRedux.dispatch({
      type: Actions.APP_Login, data: {
        loginName: res.loginName,
        loginPassword: res.loginPassword,
        errMsg: "",
        success: true
      }
    });
  }

  private loginFailureHandler(res) {
    this.ngRedux.dispatch({
      type: Actions.APP_Login,
      data: {
        name: "",
        password: "",
        errMsg: "Login failed",
        success: false
      }
    });
  }

  register(data: any): void {
    var registeredUsers = JSON.parse(localStorage.getItem("register") || "[]");
    console.log(data);
    var exist = registeredUsers.find(da => da.name == data.name);
    console.log("exist", exist);
    if (!exist) {
      registeredUsers.push(data);
      this.setToStorage("register", registeredUsers)
      this.registerSuccessHandler(data);
    }
    else
      this.registerErrorHandler(data);
  }

  private registerSuccessHandler(res): void {
    console.log(this.getToStorage("register"))
    console.log("res:", res)
    this.ngRedux.dispatch({
      type: Actions.APP_Register, data: {
        name: res.name,
        password: res.password,
        confirmPassword: res.confirmPassword,
        errMsg: "",
        succMsg: "Registered successfully"
      }
    });
  }

  private registerErrorHandler(res): void {
    this.ngRedux.dispatch({
      type: Actions.APP_Register,
      data: {
        name: res.name, password: res.password,
        confirmPassword: res.confirmPassword,
        errMsg: "User already exist",
        succMsg: "",
      }
    })
  }

  activeLogin(): any {
    var active = this.getToStorage("active");
    return JSON.parse(active);
  }

  logOut(): void {
    this.setToStorage("active", "");
    this.ngRedux.dispatch({
      type: Actions.APP_Login, data: {
        name: "",
        password: "",
        errMsg: ""
      }
    });
  }

  private setToStorage(key: string, value: any): void {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  }
  private getToStorage(key: string): any {
    let value = window.localStorage.getItem(key);
    return value;
  }
  getPosts(start, limit) {
    this.http.get("http://jsonplaceholder.typicode.com/posts?_start=" + start + "&_limit=" + limit)
      .subscribe(res => {
        console.log(res)
        this.ngRedux.dispatch({
          type: Actions.POST_List,
          data: {
            posts: res,
            start: start,
            limit: limit
          }
        })
      },
        err => { })
  }

  getPhotos(start, limit) {
    this.http.get(" https://jsonplaceholder.typicode.com/photos?_start=" + start + "&_limit=" + limit)
      .subscribe(res => {
        console.log(res)
        this.ngRedux.dispatch({
          type: Actions.PHOTO_List,
          data: res
        })
      },
        err => { })
  }

}
