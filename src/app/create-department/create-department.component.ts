/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-31 12:27:20
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-01 20:30:17
 */
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormGroupName,
  FormControl,
  Validators,
} from '@angular/forms';
import { MyValidators } from '../util/MyVaildators';
import { TabService } from '../tab.service';
import { DepartmentService } from '../service/department-service/department.service';
import { ResSet } from '../dataDef/ResSet';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
})
export class CreateDepartmentComponent implements OnInit {
  departmentInfo: FormGroup;
  departmentName: AbstractControl;
  departmentID: AbstractControl;
  departmentDescription: AbstractControl;
  constructor(
    private tabService: TabService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.initial();
  }
  private initial() {
    this.departmentInfo = new FormGroup({
      departmentName: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        MyValidators.CN(),
      ]),
      departmentID: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        MyValidators.UpperCase(),
      ]),
      departmentDescription: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
    this.departmentDescription = this.departmentInfo.controls[
      'departmentDescription'
    ];
    this.departmentName = this.departmentInfo.controls['departmentName'];
    this.departmentID = this.departmentInfo.controls['departmentID'];
    this.departmentID.setAsyncValidators(
      this.departmentService.checkDepartmentUnique()
    );
  }

  createDepartment(): void {
    this.departmentService
      .createDepartment(
        this.departmentID.value,
        this.departmentName.value,
        this.departmentDescription.value
      )
      .then((res) => {
        if (res) this.departmentInfo.reset();
      });
  }
}
