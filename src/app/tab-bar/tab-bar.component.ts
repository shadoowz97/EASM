import { Component, OnInit } from '@angular/core';
import {TabService} from "../tab.service"

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {
  tabList;
  constructor(private tabService:TabService) { }
  activeTab(id){
    this.tabService.switchToTab(id);
  }
  cancelTab(id){
    this.tabService.cancelTab(id)
  }
  ngOnInit() {
    this.tabList=this.tabService.getTabList()
  }

}
