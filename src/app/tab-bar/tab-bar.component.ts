/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2020-07-13 22:21:34
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-14 17:27:46
 */
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
  cancelTab(id:string){
    this.tabService.cancelTab(id)
  }
  ngOnInit() {
    this.tabList=this.tabService.getTabList()
  }

}
