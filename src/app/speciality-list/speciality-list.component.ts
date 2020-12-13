/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-07 21:33:38
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-09 09:48:25
 */
import { Component, OnInit } from '@angular/core';
import { SpecialityInfo } from '../dataDef/SpecialityInfo';
import { EAService } from '../service/ea-service/EA-service.service';

@Component({
  selector: 'app-speciality-list-component',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.css'],
})
export class SpecialityListComponent implements OnInit {
  speciality: SpecialityInfo[];
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
          text: '使用中',
          value: 'active',
          byDefault: true,
        },
        {
          text: '废弃',
          value: 'deprecated',
        },
      ],
      filterFn: (status: string[], item: SpecialityInfo) =>
        status.some((value) => item.state.indexOf(value) !== -1),
    },
    {
      name: '废弃',
      size: '50px',
    },
    {
      name: '删除',
      size: '50px',
    },
  ];
  constructor(private eaService: EAService) {
    this.loadData();
  }

  loadData() {
    this.spinningFlag = true;
    this.eaService
      .getSpecialities()
      .then((res: SpecialityInfo[]) => {
        this.speciality = res;
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  ngOnInit() {}

  async deprcated(id: string) {
    //this.spinningFlag = true;
    var flag = false;
    await this.eaService.deprecateSpeciality(id).then((res: boolean) => {
      flag = res;
    });
    if (flag) {
      this.loadData()
    }
  }

  async delete(id: string) {
    var flag = false;
    await this.eaService.deleteSpeciality(id).then((res: boolean) => {
      flag = res;
    });
    if (flag) {
      this.loadData()
    }
  }
}
