import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  userName:String
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userName=this.userService.getUserName();
  }

}
