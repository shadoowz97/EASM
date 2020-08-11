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
      filterFn: (status: string, item: DepartmentInfo) =>
        status.indexOf(item.status) !== -1,
    },
  ];
  widthConfig: string[];
  constructor(private departmentService: DepartmentService) {
    this.departmentList = this.departmentService.getDepartmentInfo().data;
    this.widthConfig = this.colConfig.map((value) => value.size);
  }

  refreshList() {
    this.departmentList = this.departmentService.getDepartmentInfo().data();
  }

  ngOnInit(): void {}
}
