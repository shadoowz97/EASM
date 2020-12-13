/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-10 07:47:21
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-07 22:36:04
 */
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { EAService } from '../service/ea-service/EA-service.service';

@Component({
  selector: 'app-create-speciality',
  templateUrl: './create-speciality.component.html',
  styleUrls: ['./create-speciality.component.css'],
})
export class CreateSpecialityComponent implements OnInit {
  specialityIdControl: AbstractControl;
  specialityNameControl: AbstractControl;
  specialityYear: AbstractControl;
  specialityEnControl: AbstractControl;
  specialityForm: FormGroup;
  spinningFlag = false;
  constructor(private eaService: EAService, private msg: NzMessageService) {}
  ngOnInit() {
    this.initial();
  }
  private initial() {
    this.specialityForm = new FormGroup({
      specialityIdControl: new FormControl('', {
        validators: [Validators.nullValidator, Validators.required],
        updateOn: 'blur',
      }),
      specialityNameControl: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
      specialityEnControl: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
      specialityYearControl: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
        Validators.max(5),
        Validators.min(1),
      ]),
    });
    this.specialityEnControl = this.specialityForm.controls[
      'specialityEnControl'
    ];
    this.specialityIdControl = this.specialityForm.controls[
      'specialityIdControl'
    ];
    this.specialityIdControl.setAsyncValidators(
      this.eaService.isSpecialityUnique()
    );
    this.specialityNameControl = this.specialityForm.controls[
      'specialityNameControl'
    ];
    this.specialityYear = this.specialityForm.controls['specialityYearControl'];
  }

  async createSpeciality() {
    this.spinningFlag = true;
    await this.eaService
      .createSpeciality(
        this.specialityNameControl.value,
        this.specialityEnControl.value,
        this.specialityIdControl.value,
        this.specialityYear.value
      )
      .then((res: boolean) => {
        if (res) {
          this.msg.success('创建成功');
          this.specialityForm.reset();
        }
      });
    this.spinningFlag = false;
  }
}
