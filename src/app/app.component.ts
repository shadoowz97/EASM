import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from './tab.service';
import { UserService } from './service/user-service/user.service';
import { root } from "./service-config" 
import { UserLogInModel } from './dataDef/UserLogInModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rootService=root;
  userModel:UserLogInModel
  userType: string;
  constructor(
    private router: Router,
    private tabService: TabService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userModel=this.userService.accessUserModel();
    this.router.navigate(['/welcome']);
    /*
    this.router.events.subscribe((event) => {
      // example: NavigationStart, , NavigationEnd
      console.log(event);
    });*/
  }

  login() {
    this.userService.doLogin().subscribe(
      {
        next:(data:any)=>{
          console.log(data)
        },
        error:err=>{
          console.log(err);
        },
        complete:()=>{
          console.log("done")
          this.userModel.userState=true
        }

      }
    );
    this.router.navigate(['/welcome']);
  }

  title = 'angular-demo';
}
