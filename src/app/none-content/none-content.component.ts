/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-15 17:31:10
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 10:12:20
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-none-content',
  templateUrl: './none-content.component.html',
  styleUrls: ['./none-content.component.css'],
})
export class NoneContentComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    this.userService.changeUserState(2);
    console.log('change success');
    this.to()
  }
  to(): void {
    //this.router.navigate(["certificationstudentDetail",'410102199707160055']);
  }
  ngOnInit() {}
}
