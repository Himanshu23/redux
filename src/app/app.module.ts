import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppService } from './app.service';
//import {InputTextModule} from 'primeng/inputtext';
//import {ButtonModule} from 'primeng/button';
import { NgRedux, NgReduxModule} from "ng2-redux";
import { reducer, IAppState, INITIAL_STATE } from "./redux";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterializeModule } from "angular2-materialize";


//import { ButtonsModule } from 'ngx-bootstrap/buttons';

const appRoutes: Routes = [
  { path: 'home', component: ContentComponent },
  { path: 'content-view/:id', component: ContentViewComponent},
  { path: 'content-list',   component: ContentListComponent},
  { path: '**', component: ContentComponent }];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ContentListComponent,
    ContentViewComponent,
   
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    MaterializeModule,
   //InputTextModule,
  //ButtonsModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux:NgRedux<IAppState>){
        ngRedux.configureStore(reducer, INITIAL_STATE, [], []);
    } 
}
