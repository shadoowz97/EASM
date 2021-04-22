/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2021-04-22 13:39:20
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-22 13:44:13
 */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CertificationService } from '../service/certification-service/certification.service';
import { MyValidators } from '../util/MyVaildators';

@Component({
  selector: 'app-create-certification-student',
  templateUrl: './create-certification-student.component.html',
  styleUrls: ['./create-certification-student.component.scss'],
})
export class CreateCertificationStudentComponent implements OnInit {
  certificationStudentForm: FormGroup;
  private prcIDControl: AbstractControl;
  private nameControl: AbstractControl;
  private sexControl: AbstractControl;
  private contactTelControl: AbstractControl;
  private backTelControl: AbstractControl;
  private addressControl: AbstractControl;
  private affilimtionControl: AbstractControl;
  constructor(private certificationService: CertificationService) {}

  private initial():void{
    this.certificationStudentForm=new FormGroup({
      prcID:new FormControl(null,{
        validators:[Validators.required,Validators.nullValidator],
        updateOn:'blur'
      }),
      name:new FormControl()
    })
  }
  ngOnInit() {}
}
