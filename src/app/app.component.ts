import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from './tab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router,private tabService:TabService) {}
  ngOnInit() {
    this.router.navigate(["/welcome"]);
    /*
    this.router.events.subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      console.log(event);
    });*/
  }
  title = 'angular-demo';
}
