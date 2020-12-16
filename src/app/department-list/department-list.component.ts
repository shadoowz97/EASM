/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-01 07:51:52
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-15 16:33:11
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../service/department-service/department.service';
import { DepartmentInfo } from '../dataDef/DepartmentInfo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  departmentList: DepartmentInfo[];
  subscriptions: Subscription[] = [];
  colConfig = [
    {
      name: '部门名称',
      size: '150px',
    },
    {
      name: '部门编号',
      size: '150px',
    },
    {
      name: '部门状态',
      size: '100px',
      filterMultiple: true,
      filterList: [
        {
          text: 'active',
          value: 'active',
          byDefault: true,
        },
        {
          text: 'deprecated',
          value: 'deprecated',
        },
      ],
      filterFn: (status: string[], item: DepartmentInfo) =>
        status.some((value) => item.departmentState.indexOf(value) !== -1),
    },
    {
      name: '管理',
      size: '50px',
    },
    {
      name: '删除',
      size: '50px',
    },
    {
      name: '废弃',
      size: '50px',
    },
  ];
  widthConfig: string[];
  constructor(private departmentService: DepartmentService) {
    this.subscriptions.push(
      this.departmentService.getDepartments().subscribe({
        next: (info: DepartmentInfo[]) => {
          this.departmentList = info;
        },
      })
    );
  }
  ngOnDestroy(): void {
    //console.log(this.subscriptions.length + ' 销毁订阅');
    this.subscriptions.forEach((s) => s.unsubscribe());
  }


  detail(id: string) {
    this.departmentService.toDetail(id);
  }

  delete(id: string) {
    this.departmentService.deleteDepartment(id);
  }
  deprecated(id: string) {
    this.departmentService.deprecatedDepartment(id);
  }

  ngOnInit(): void {}
}
