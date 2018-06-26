import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private svc: AppService,private router: Router) {
      }

}
