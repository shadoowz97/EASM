import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';
import { SchoolYearService } from '../service/school-year-service/school-year.service';
import { AdministrativeClazzService } from '../service/ad-clazz/administrative-clazz.service';

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
  constructor(
    private scService: SchoolYearService,
    private clazzService: AdministrativeClazzService
  ) {}
  schoolYearList: number[];
  ngOnInit() {
    this.initial();
    this.schoolYearList = this.scService.getRGrade().data;
  }

  private initial() {
    this.adClazzForm = new FormGroup({
      clazzName: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
      clazzId: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
    });
    this.clazzName = this.adClazzForm.controls['clazzName'];
    this.clazzId = this.adClazzForm.controls['clazzId'];
  }
  createAdministrativeClazz() {
    this.clazzService.addClazz({
      status: 'active',
      clazzId: this.clazzId.value,
      clazzName: this.clazzName.value,
      rGrade: this.clazzSchoolYear,
    });
    alert('创建成功！');
  }
}
