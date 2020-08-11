import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleRouterReuseStrategy } from './strategy/SimpleRouterReuseStrategy';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private curid = 'welcome';
  private welcomeInfo = {
    title: 'welcome',
    routerLink: 'welcome',
    active: true,
    id: 'welcome',
    repeat: false,
    param: [],
  };
  private tabList = [
    {
      title: 'welcome',
      routerLink: 'welcome',
      active: true,
      id: 'welcome',
      repeat: false,
      param: [],
    },
  ];
  constructor(private router: Router) {}
  getTabList() {
    return this.tabList;
  }
  public addTab(id, href, title, param, repeat) {
    let flag = true;
    for (let t of this.tabList) {
      if (t.id == id && !t.repeat) {
        flag = false;
        break;
      }
    }
    if (flag) {
      this.tabList.push({
        id: id,
        routerLink: href,
        title: title,
        param: param,
        active: false,
        repeat: false,
      });
    }
    this.switchToTab(id);
  }
  public switchToTab(id): Promise<boolean> | null {
    let result: Promise<boolean>;
    let path;
    for (let tab of this.tabList) {
      if (tab.id == id) {
        tab.active = true;
        console.log(tab.routerLink);
        path = [tab.routerLink].concat(tab.param);
      } else {
        tab.active = false;
      }
    }
    this.curid = id;
    result = this.router.navigate(path);
    return result;
  }

  public cancelTab(id) {
    let tab = null;
    for (var i = 0; i < this.tabList.length; i++) {
      if (this.tabList[i].id == id) {
        console.log(this.getUrl(this.tabList[i]) + '--- delete cache');
        tab = this.tabList[i];
        this.tabList.splice(i, 1);
        break;
      }
    }
    if (this.tabList.length != 0 && id == this.curid) {
      this.switchToTab(this.tabList[0].id).then(function () {
        if (tab != null) {
          let url = '/';
          url += tab.routerLink;
          for (let p of tab.param) {
            url += '/' + p;
          }
          SimpleRouterReuseStrategy.deleteCache(url);
        }
      }); 
    }
    if(id!=this.curid&&tab!=null){
      SimpleRouterReuseStrategy.deleteCache(this.getUrl(tab))
    }
  }

  private getUrl(tab): String {
    let url = '/';
    url += tab.routerLink;
    for (let p of tab.param) {
      url += '/' + p;
    }
    return url;
  }
}
