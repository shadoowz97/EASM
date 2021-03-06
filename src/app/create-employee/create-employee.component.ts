/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-01 21:27:35
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-15 16:57:35
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { DepartmentInfo } from '../dataDef/DepartmentInfo';
import { Duty } from '../dataDef/Duty';
import { ResSet } from '../dataDef/ResSet';
import { DepartmentService } from '../service/department-service/department.service';
import { UserService } from '../service/user-service/user.service';
import { MyValidators } from '../util/MyVaildators';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  departmentList: DepartmentInfo[];
  duties: Duty[];
  employeeNameControl: AbstractControl;
  employeeIdControl: AbstractControl;
  titles: string[];
  employeeTitle: string;
  employeeDutyId: string;
  employeeDepartmentId: string;
  employeeForm: FormGroup;
  employeeEmailControl: AbstractControl;
  isSpining = false;
  subscribtions: Subscription[]=[];
  constructor(
    private usrService: UserService,
    private departmentService: DepartmentService,
    private msgService: NzMessageService
  ) {
    this.subscribtions.push(
      this.departmentService.getDepartments().subscribe({
        next: (dl: DepartmentInfo[]) => {
          this.departmentList = dl.filter((value) => {
            return value.departmentState == 'active';
          });
        },
      })
    );
    this.departmentService.getDuties().then((res) => {
      this.duties = res;
    });
    this.departmentService.getTitle().then((res) => {
      this.titles = res;
    });
    this.employeeForm = new FormGroup({
      employeeName: new FormControl('', {
        validators: [Validators.nullValidator, Validators.required],
        updateOn: 'blur',
      }),
      employeeId: new FormControl('', {
        validators: [Validators.required, Validators.nullValidator],
        updateOn: 'blur',
      }),
      employeeEmail: new FormControl('', {
        validators: [
          Validators.required,
          Validators.nullValidator,
          MyValidators.Email(),
        ],
      }),
    });
    this.employeeIdControl = this.employeeForm.controls['employeeId'];
    this.employeeNameControl = this.employeeForm.controls['employeeName'];
    this.employeeIdControl.setAsyncValidators(this.usrService.isUsrIdUnique());
    this.employeeEmailControl = this.employeeForm.controls['employeeEmail'];
  }
  ngOnDestroy(): void {
    this.subscribtions.forEach((s) => s.unsubscribe);
  }

  public createEmployee() {
    this.isSpining = true;
    this.usrService
      .createEmployee(
        this.employeeNameControl.value,
        this.employeeIdControl.value,
        this.employeeDutyId,
        this.employeeTitle,
        this.employeeDepartmentId,
        this.employeeEmailControl.value
      )
      .then((res: boolean) => {
        this.isSpining = false;
        if (res) {
          this.msgService.success('创建成功');
          this.employeeForm.reset();
          this.employeeTitle = null;
          this.employeeDutyId = null;
          this.employeeDepartmentId = null;
        } else this.msgService.error('创建失败');
      });
  }

  ngOnInit() {}
}
