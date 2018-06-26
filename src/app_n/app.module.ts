import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AppService } from './app.service';

import { NgRedux, NgReduxModule } from "ng2-redux";
import { reducer, IAppState, INITIAL_STATE } from "./redux";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux:NgRedux<IAppState>){
        ngRedux.configureStore(reducer, INITIAL_STATE, [], []);
    } 
}
