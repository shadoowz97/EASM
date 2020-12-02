/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-01 07:51:52
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-01 21:22:51
 */
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../service/department-service/department.service';
import { DepartmentInfo } from '../dataDef/DepartmentInfo';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departmentList: DepartmentInfo[];
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
      size: '删除',
    },
  ];
  widthConfig: string[];
  constructor(private departmentService: DepartmentService) {
    console.log('start To load');
    this.departmentService
      .getDepartmentList()
      .then((res) => (this.departmentList = res));
    console.log('end load');
    this.widthConfig = this.colConfig.map((value) => value.size);
  }

  refreshList() {
    this.departmentService.loadDepartment();
    this.departmentService
      .getDepartmentList()
      .then((res) => (this.departmentList = res));
  }
  detail(id:string){

  }

  delete(id:string){
    
  }

  ngOnInit(): void {}
}
