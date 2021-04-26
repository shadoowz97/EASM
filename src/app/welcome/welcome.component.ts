/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-16 22:41:35
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 10:14:13
 */
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserService } from '../service/user-service/user.service';
//import {UserService} from "../service/user-service/user.service"
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  username: String;
  content: string;
  constructor(
    private userService: UserService,
    private msg: NzMessageService,
    private router: Router
  ) {
    this.userService.subscribeUser().subscribe({
      next: (o) => {
        this.username = o.username;
        if (o.userState == 2) {
          o.userState = 0;
          this.router.navigate(['']);
        }
      },
    });
  }
  showMessage() {
    this.msg.error('show');
  }
  ngOnInit() {}
}
