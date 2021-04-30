/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-08 15:25:38
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-27 23:28:41
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  queryModeFlag = {};
  constructor(
    private router: Router,
    private tabService: TabService,
    private userService: UserService,
    private nzMessageService: NzMessageService,
    private activerouter: ActivatedRoute
  ) {

  }
  ngOnInit() {
    console.log(this.router.url)
    this.userService.subscribeUser().subscribe({
      next: (um) => {
        this.userModel = um;
      },
    });
    // this.router.navigate(['/welcome']);
    /*
    this.router.events.subscribe((event) => {
      // example: NavigationStart, , NavigationEnd
      console.log(event);
    });*/
  }
  public exit() {
    this.userModel.userId = '';
    this.userModel.userState = 0;
    this.userModel.roles = [];
    this.userModel.username = '';
  }

  login() {
    this.userService.doLogin().subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.stateCode == 200) {
          this.nzMessageService.create('success', data.message);
          this.userModel.userState = 1;
          this.userModel.username = data.data.username;
          this.userModel.roles = data.data.roles;
          this.userModel.authorization = data.data.authorization;
          this.router.navigate(['/welcome']);
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
  }

  title = 'angular-demo';
}
