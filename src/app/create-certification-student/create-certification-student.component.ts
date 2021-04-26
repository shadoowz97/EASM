/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-22 13:39:20
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-22 21:05:07
 */
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CertificationService } from '../service/certification-service/certification.service';
import { MyValidators } from '../util/MyVaildators';

@Component({
  selector: 'app-create-certification-student',
  templateUrl: './create-certification-student.component.html',
  styleUrls: ['./create-certification-student.component.scss'],
})
export class CreateCertificationStudentComponent implements OnInit {
  spinningFlag: Boolean = false;
  certificationStudentForm: FormGroup;
  private prcIDControl: AbstractControl;
  private nameControl: AbstractControl;
  private sexControl: AbstractControl;
  private contactTelControl: AbstractControl;
  private backTelControl: AbstractControl;
  private addressControl: AbstractControl;
  private affiliationControl: AbstractControl;
  constructor(private certificationService: CertificationService) {
    this.initial();
  }
  private initial(): void {
    this.certificationStudentForm = new FormGroup({
      prcID: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.nullValidator,
          MyValidators.PRCID(),
        ],
        updateOn: 'blur',
      }),
      name: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      sex: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      contactTel: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      backTel: new FormControl(null, {
        validators: [],
      }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
      affiliation: new FormControl(null, {
        validators: [Validators.required, Validators.nullValidator],
      }),
    });
    this.prcIDControl = this.certificationStudentForm.controls['prcID'];
    this.prcIDControl.setAsyncValidators(
      this.certificationService.isPRCIDUnique()
    );
    this.nameControl = this.certificationStudentForm.controls['name'];
    this.sexControl = this.certificationStudentForm.controls['sex'];
    this.contactTelControl = this.certificationStudentForm.controls[
      'contactTel'
    ];
    this.backTelControl = this.certificationStudentForm.controls['backTel'];
    this.addressControl = this.certificationStudentForm.controls['address'];
    this.affiliationControl = this.certificationStudentForm.controls[
      'affiliation'
    ];
  }
  public createCertificationStudent(): void {
    this.spinningFlag = true;
    this.certificationService
      .createCertificationStudent({
        prcID: this.prcIDControl.value as string,
        name: this.nameControl.value as string,
        sex: this.sexControl.value as string,
        contactTel: this.contactTelControl.value as string,
        backTel: this.backTelControl.value as string,
        address: this.addressControl.value as string,
        affiliation: this.affiliationControl.value as string,
      })
      .then((res: Boolean) => {
        if (res) this.certificationStudentForm.reset();
      })
      .catch((e) => {})
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  ngOnInit() {}
}
