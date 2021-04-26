/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-25 10:43:58
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 10:52:40
 */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-show-wait-to-push',
  templateUrl: './show-wait-to-push.component.html',
  styleUrls: ['./show-wait-to-push.component.scss'],
})
export class ShowWaitToPushComponent implements OnInit {
  constructor(private usrService: UserService) {}
  data: [] = [];
  ngOnInit() {
    this.usrService.queryUserWaitToPush().then((data) => {
      if (data !== null) this.data = data;
      else {
        this.data = [];
      }
    });
  }
  delete(id: string): void {
    this.usrService.deleteEmployee(id).then((res) => {
      if (res) {
        this.usrService.queryUserWaitToPush().then((data) => {
          if (data !== null) this.data = data;
          else {
            this.data = [];
          }
        });
      }
    });
  }
}
