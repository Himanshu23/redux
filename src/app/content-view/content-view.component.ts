import { Component, OnInit, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { IAppState, Actions } from "./../redux";
import { AppService } from './../app.service'
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class ContentViewComponent implements OnInit, OnDestroy {
  private ref_ngRedux: any;
  private store: any;
  private photos = [];
  private start = 0;
  private limit;

  @ViewChild('carousel') carouselElement;
  actions = new EventEmitter<string>();
  showInitialized = false;
  private init = false;
  
  constructor(private ngRedux: NgRedux<IAppState>, private svc: AppService,
    private route: ActivatedRoute) {
    
      this.ref_ngRedux = this.ngRedux.select<any>('photos') // <- New
      .subscribe((photos) => {
        this.photos = photos;
        window.setTimeout(() => {
          if (!this.init) {
           
            this.carouselElement.nativeElement.classList.toggle("initialized")
            this.actions.emit("carousel");
            this.init = true;
          }
        }, 1000); 
      });
    }
    
  
  ngOnDestroy() {
    this.ref_ngRedux.unsubscribe()  ;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
    this.limit = params.id;
      this.svc.getPhotos(this.start, this.limit);
    });
  }

}
