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
  constructor(private userService:UserService,private msg:NzMessageService) { 
    this.username=this.userService.getUserName()
  }
  showMessage(){
    this.msg.error("show")
  }
  ngOnInit() {
  }

}
