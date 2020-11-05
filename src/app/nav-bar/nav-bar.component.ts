import { Component, OnInit, Input } from '@angular/core';
import { TabService } from "../tab.service"
declare var $:any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  @Input() root;
  constructor(private tabService:TabService) { 

  }
  addToTabList(id,url,title,param=[]){
    let npath=[]
    this.tabService.addTab(id,url,title,param,false)
  }

  ngOnInit() {
    $('.sidebar-scroll').slimScroll({
      height: '95%',
      wheelStep: 2,
    });
  }

}
