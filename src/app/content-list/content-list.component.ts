import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { IAppState, Actions } from "./../redux";
import { AppService } from './../app.service'
import { Router } from "@angular/router";
import { } from 'rxjs/Uns';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
  private ref_ngRedux;
  private store: any;
  private posts;
  private start;
  private limit;

  constructor(private ngRedux: NgRedux<IAppState>, private svc: AppService,
    private router: Router) {
      this.ref_ngRedux = this.ngRedux.select<any>('postList') // <- New
      .subscribe((postList) => {
      this.posts = postList.posts
        this.start = postList.start;
        this.limit = postList.limit;
      });}
  ngOnDestroy() {
    this.ref_ngRedux.unsubscribe();
  }
  fetchPosts() {
    var start = this.start + this.limit;
    this.svc.getPosts(start, this.limit);
  }

  ngOnInit() {
    this.svc.getPosts(0, 10);
   
  }

}
