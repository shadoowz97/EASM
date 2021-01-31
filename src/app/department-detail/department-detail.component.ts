/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-02 15:48:54
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-31 11:19:49
 */
/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-02 15:48:54
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-16 21:49:03
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../service/department-service/department.service';
import { DepartmentDetail } from '../dataDef/DepartmentDetail';
import { ResSet } from '../dataDef/ResSet';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { TabService } from '../tab.service';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
})
export class DepartmentDetailComponent implements OnInit, OnDestroy {
  departmentModel: DepartmentDetail;
  subscriptions: Subscription[] = [];
  constructor(
    private router: ActivatedRoute,
    private departmentService: DepartmentService,
    private msgService: NzMessageService,
    private usrService: UserService
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {
    var departmentId;
    console.log('订阅成功');
    this.subscriptions.push(
      this.router.paramMap.subscribe((params) => {
        this.departmentModel = null;
        departmentId = params.get('id');
        this.departmentService
          .departmentDetail(departmentId)
          .then((res: DepartmentDetail) => {
            if (res !== null) {
              this.departmentModel = res;
            }
          });
      })
    );
  }
  public toDetail(employeeId: string) {
    this.usrService.toEmployeeDetail(employeeId);
  }
}
