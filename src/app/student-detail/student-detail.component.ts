/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-01-29 10:21:48
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-30 17:35:38
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseEmployee } from '../dataDef/BaseEmployee';
import { DepartmentDetail } from '../dataDef/DepartmentDetail';
import { DepartmentInfo } from '../dataDef/DepartmentInfo';
import { StudentDetail } from '../dataDef/studentDetail';
import { StudentProfileModel } from '../dataDef/StudentProfileModel';
import { DepartmentService } from '../service/department-service/department.service';
import { StudentService } from '../service/student-service/student.service';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  spinningFlag = false;
  subscription: Subscription[] = [];
  currentId: string;
  studentDetail: StudentDetail;
  reloadState = false;
  isAdmin = false;
  establishDrawerVisible = false;
  departmentId: string;
  supervisorId: string;
  departmentList: DepartmentInfo[];
  supervisors: BaseEmployee[];
  supervisorType = 0;
  loadingSupervisors = false;
  constructor(
    private router: ActivatedRoute,
    private studentService: StudentService,
    private usrService: UserService,
    private deparmentService: DepartmentService
  ) {
    this.subscription.push(
      this.deparmentService
        .getDepartments()
        .subscribe((departmentInfo: DepartmentInfo[]) => {
          this.departmentList = departmentInfo;
        })
    );
    this.isAdmin = this.usrService.hasRole('admin');
    this.subscription.push(
      this.router.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.spinningFlag = true;
        if (this.currentId !== id) {
          this.loadStudentDetail(id);
          this.studentDetail = null;
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public establishRealtion(): void {
    this.spinningFlag = true;
    this.studentService
      .establishRelation(
        this.studentDetail.studentProfile.studentId,
        this.supervisorId,
        this.supervisorType
      )
      .then((res: boolean) => {
        if (res) {
          this.spinningFlag = false;
          this.establishDrawerVisible = false;
          this.reloadStudent();
        }
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  departmentChange(departmentId: string) {
    this.loadingSupervisors = true;
    this.deparmentService
      .departmentDetail(departmentId)
      .then((detail: DepartmentDetail) => {
        this.supervisors=[detail.supervisor].concat((detail.others.concat(detail.sps)).filter((value:BaseEmployee)=>{
          
        }) )
      });
  }
  public reloadStudent(): void {
    this.reloadState = true;
    this.loadStudentDetail(this.currentId);
  }
  public loadStudentDetail(id: string): void {
    this.studentService
      .queryStudentProfile(id)
      .then((res: StudentDetail) => {
        this.studentDetail = res;
      })
      .finally(() => {
        this.spinningFlag = false;
        this.currentId = id;
        this.reloadState = false;
      });
  }
  public serverMentoringRelationship(supervisorId: string): void {
    this.usrService
      .serverMentoringRelationship(
        this.studentDetail.studentProfile.studentId,
        supervisorId
      )
      // tslint:disable-next-line: ban-types
      .then((res: Boolean) => {
        if (res) {
          this.reloadStudent();
        }
      });
  }
  ngOnInit(): void {}
}
