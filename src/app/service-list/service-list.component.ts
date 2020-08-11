import { Component, OnInit, Input } from '@angular/core';
import {TabService} from "../tab.service"
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  @Input() func;
  constructor(private tabService:TabService) { }

  ngOnInit() {
  }
  addTab(id:String,url:String,title:String){
    this.tabService.addTab(id,url,title,[],false)
  }


}
