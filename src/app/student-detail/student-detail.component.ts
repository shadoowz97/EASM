/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-01-29 10:21:48
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-02-01 10:47:21
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
  establishRelationDisabled = false;
  constructor(
    private router: ActivatedRoute,
    private studentService: StudentService,
    private usrService: UserService,
    private departmentService: DepartmentService
  ) {
    this.subscription.push(
      this.departmentService
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

  cancelDrawer() {
    this.establishDrawerVisible = false;
  }
  showAddRelationDrawer() {
    for (let department of this.departmentList) {
      if (
        department.departmentName ==
        this.studentDetail.studentProfile.departmentId
      ) {
        this.departmentId = department.departmentId;
        break;
      }
      this.departmentId = this.departmentList[0].departmentId;
    }
    this.departmentChange(this.departmentId);
    this.establishDrawerVisible = true;
  }
  departmentChange(departmentId: string): void {
    this.loadingSupervisors = true;
    this.establishRelationDisabled = true;
    this.departmentService
      .querySupervisorInDepartment(departmentId)
      .then((res) => {
        if (res != null) {
          this.supervisors = res;
          this.supervisorId = this.supervisors[0].employeeId;
        } else this.supervisors = [];
      })
      .finally(() => {
        this.loadingSupervisors = false;
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
