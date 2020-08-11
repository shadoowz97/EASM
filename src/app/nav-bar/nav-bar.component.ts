import { Component, OnInit } from '@angular/core';
import { root } from "../service-config" 
import { TabService } from "../tab.service"

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  root=root
  constructor(private tabService:TabService) { 

  }
  addToTabList(id,url,title){
    let npath=[]
    this.tabService.addTab(id,url,title,[],false)
  }

  ngOnInit() {
  }

}
