import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../dataDef/SchoolYear';
import { SchoolYearService } from '../service/school-year-service/school-year.service';

@Component({
  selector: 'app-schoolYear-list',
  templateUrl: './schoolYear-list.component.html',
  styleUrls: ['./schoolYear-list.component.css'],
})
export class SchoolYearListComponent implements OnInit {
  widthConfig: string[];
  schoolYearList: SchoolYear[];
  colConfig = [
    {
      name: '学期ID',
      size: '100px',
    },
    {
      name: '学期名称',
      size: '150px',
    },
    {
      name: '开始日期',
      size: '100px',
      sortOrder: 'descend',
      sortFn: (a: SchoolYear, b: SchoolYear) => {
        return a.startDate - b.startDate;
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '结束日期',
      size: '100px',
      sortOrder: 'descend',
      sortFn: (a: SchoolYear, b: SchoolYear) => {
        return a.endDate - b.endDate;
      },
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: '学期状态',
      size: '70px',
      filterMultiple: true,
      listOfFilter: [
        {
          text: '准备中',
          value: '准备中',
          byDefault: true,
        },
        {
          text: '进行中',
          value: '进行中',
        },
        {
          text: '已结束',
          value: '已结束',
        },
      ],
      filterFn: (list: string[], d: SchoolYear) =>
        list.some((value) => d.state.indexOf(value) !== -1),
      sortFn: null,
      sortOrder: null,
      sortDirections: null,
    },
    {
      name: '管理学期',
      size: '50px',
    },
  ];
  constructor(private schoolYearService: SchoolYearService) {
    this.schoolYearService.getSchoolYearList().then((data: SchoolYear[]) => {
      this.schoolYearList = data;
      console.log('schoolYear' + JSON.stringify(data));
    });
    console.log('finish');
  }

  ngOnInit() {}
}
