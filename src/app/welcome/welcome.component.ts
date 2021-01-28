/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2020-07-16 22:41:35
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-24 23:00:50
 */
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserService } from '../service/user-service/user.service';
//import {UserService} from "../service/user-service/user.service"
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username:String
  content:string
  constructor(private userService:UserService,private msg:NzMessageService) { 
    this.username=this.userService.getUserName()
  }
  showMessage(){
    this.msg.error("show")
  }
  ngOnInit() {
  }

}
