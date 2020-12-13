/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-02 15:48:54
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-07 08:37:26
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../service/department-service/department.service';
import { DepartmentDetail } from '../dataDef/DepartmentDetail';
import { ResSet } from '../dataDef/ResSet';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
})
export class DepartmentDetailComponent implements OnInit {
  departmentModel: DepartmentDetail;
  constructor(
    private router: ActivatedRoute,
    private departmentService: DepartmentService,
    private msgService: NzMessageService
  ) {}

  ngOnInit() {
    var departmentId;
    this.router.paramMap.subscribe((params) => {
      this.departmentModel = null;
      departmentId = params.get('id');
      this.departmentService
        .departmentDetail(departmentId)
        .then((res: ResSet) => {
          if (res.stateCode == 200) {
            this.departmentModel = res.data;
          } else {
            this.msgService.error('拉取详情失败');
          }
        });
    });
  }
}
