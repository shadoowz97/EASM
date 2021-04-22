/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-08-13 10:45:27
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-17 16:36:36
 */
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators
} from '@angular/forms';
import { SchoolYearService } from '../service/school-year-service/school-year.service';
import { AdministrativeClazzService } from '../service/ad-clazz/administrative-clazz.service';
import { SchoolYear } from '../dataDef/SchoolYear';

@Component({
  selector: 'app-create-administrative-class',
  templateUrl: './create-administrative-class.component.html',
  styleUrls: ['./create-administrative-class.component.css'],
})
export class CreateAdministrativeClassComponent implements OnInit {
  adClazzForm: FormGroup;
  clazzName: AbstractControl;
  clazzId: AbstractControl;
  clazzSchoolYear: string;
  spinningFlag = false;
  constructor(
    private scService: SchoolYearService,
    private clazzService: AdministrativeClazzService
  ) {}
  schoolYearList: string[];
  ngOnInit() {
    this.initial();
    this.scService.getSchoolYearList().then((res: SchoolYear[]) => {
      var years = res.map((value: SchoolYear) => {
        return value.rGrade;
      });
      this.schoolYearList = years;
    });
  }

  private initial() {
    this.adClazzForm = new FormGroup({
      clazzName: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
      clazzId: new FormControl('', {
        validators: [Validators.nullValidator, Validators.required],
        updateOn: 'blur',
      }),
    });
    this.clazzName = this.adClazzForm.controls['clazzName'];
    this.clazzId = this.adClazzForm.controls['clazzId'];
    this.clazzId.setAsyncValidators(this.clazzService.isClazzIdUnique());
  }
  async createAdministrativeClazz() {
    this.spinningFlag = true;
    await this.clazzService
      .addClazz(this.clazzName.value, this.clazzId.value, this.clazzSchoolYear)
      .then((res: boolean) => {
        if (res) {
          this.adClazzForm.reset();
        } else {
        }
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }
}
