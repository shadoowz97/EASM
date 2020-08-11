import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
//import {UserService} from "../service/user-service/user.service"

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username:String
  constructor(private userService:UserService) { 
    this.username=this.userService.getUserName()
  }

  ngOnInit() {
  }

}
