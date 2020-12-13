/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2020-12-09 10:31:46
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-09 21:26:24
 */
import { Component, OnInit } from '@angular/core';
import { AdministrativeClazz } from '../dataDef/AdministrativeClazz';
import { AdministrativeClazzService } from '../service/ad-clazz/administrative-clazz.service';
import { EAService } from '../service/ea-service/EA-service.service';

@Component({
  selector: 'app-administrativeClazz-list',
  templateUrl: './administrativeClazz-list.component.html',
  styleUrls: ['./administrativeClazz-list.component.css']
})
export class AdministrativeClazzListComponent implements OnInit {
  clazzs: AdministrativeClazz[];
  spinningFlag: boolean = false;
  colConfig = [
    {
      name: '专业名称',
      size: '150px',
    },
    {
      name: '专业英文名称',
      size: '150px',
    },
    {
      name: '学制',
      size: '100px',
    },
    {
      name: '专业状态',
      size: '100px',
      filterMultiple: true,
      filterList: [
        {
          text: '在读',
          value: 'on',
          byDefault: true,
        },
        {
          text: '毕业',
          value: 'over',
        },
      ],
      filterFn: (status: string[], item: AdministrativeClazz) =>
        status.some((value) => item.state.indexOf(value) !== -1),
    },
    {
      name: '毕业',
      size: '50px',
    },
    {
      name: '删除',
      size: '50px',
    },
    {
      name:'详情',
      size:'50px'
    }
  ];
  constructor(private adClazzService:AdministrativeClazzService ) {
    this.loadData();
  }
  loadData() {
    this.spinningFlag = true;
    this.adClazzService.getAdministrativeClazzList()
      .then((res: AdministrativeClazz[]) => {
        this.clazzs= res;
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  ngOnInit() {}
  async deprcated(id: string) {
    //this.spinningFlag = true;
    var flag = false;
    await this.adClazzService.deprecateClazz(id).then((res: boolean) => {
      flag = res;
    });
    if (flag) {
      //await this.adClazzService.loadClazz()
      this.loadData()
    }
    

}
async delete(id: string) {
  var flag = false;
  await this.adClazzService.deleteClazz(id).then((res: boolean) => {
    flag = res;
  });
  if (flag) {
    //sawait this.adClazzService.loadClazz()
    this.loadData()
  }
}
}
