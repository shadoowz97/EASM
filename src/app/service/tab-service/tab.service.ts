import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private tabList = [
    {
      title: 'welcome',
      routerLink: '',
      active: true,
      id: 'welcome',
      repeat: false,
      param: {},
    },
  ];
  constructor() {}
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
        repeat: repeat,
      });
    }
    this.switchToTab(id)
  }
  public switchToTab(id) {
    for (let tab of this.tabList) {
      if (tab.id == id) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    }
  }

  public cancelTab(id) {
    for (var i = 0; i < this.tabList.length; i++) {
      if (this.tabList[i].id == id) {
        this.tabList.splice(i, 1);
        break;
      }
    }
    if (this.tabList.length != 0) {
      this.switchToTab(this.tabList[0].id)
      this.tabList[0].active = true;
    }
  }
}
