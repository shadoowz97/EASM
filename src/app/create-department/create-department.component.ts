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
  }
 
 
 

  createDepartment(): void {
    const res: ResSet = this.departmentService.createDepartment(
      this.departmentID.value,
      this.departmentName.value,
      this.departmentDescription.value
    );
    switch(res.stateCode){
      case 200:
        alert("创建成功");
        this.initial()
        break;
      case 300:
        alert(res.message)
        break
    }
  }
}
