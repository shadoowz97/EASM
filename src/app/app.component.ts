/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2020-07-08 15:25:38
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-27 12:07:04
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from './tab.service';
import { UserService } from './service/user-service/user.service';
import { root } from './service-config';
import { UserLogInModel } from './dataDef/UserLogInModel';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rootService = root;
  userModel: UserLogInModel;
  userType: string;
  constructor(
    private router: Router,
    private tabService: TabService,
    private userService: UserService,
    private nzMessageService: NzMessageService
  ) {}
  ngOnInit() {
    this.userModel = this.userService.accessUserModel();
    this.router.navigate(['/welcome']);
    /*
    this.router.events.subscribe((event) => {
      // example: NavigationStart, , NavigationEnd
      console.log(event);
    });*/
  }
  public exit() {
    this.userModel.userId=""
    this.userModel.userState=false
    this.userModel.roles=[]
    this.userModel.username=""
  }

  login() {
    this.userService.doLogin().subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.stateCode == 200) {
          this.nzMessageService.create('success', data.message);
          this.userModel.userState = true;
          this.userModel.username = data.data.username;
          this.userModel.roles=data.data.roles
        } else {
          this.nzMessageService.error(data.message);
        }
      },
      error: (err) => {
        this.nzMessageService.create('error', '登陆失败');
      },
      complete: () => {
        console.log('done');
      },
    });
    this.router.navigate(['/welcome']);
  }

  title = 'angular-demo';
}
