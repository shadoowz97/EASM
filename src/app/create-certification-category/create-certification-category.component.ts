/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-16 10:55:22
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-19 17:14:33
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
  selector: 'app-create-certification-category',
  templateUrl: './create-certification-category.component.html',
  styleUrls: ['./create-certification-category.component.scss'],
})
export class CreateCertificationCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categroyIdControl: AbstractControl;
  categoryNameControl: AbstractControl;
  descriptionControl: AbstractControl;
  classHourControl:AbstractControl;
  spinningFlag: boolean = false;
  constructor(private certificationService: CertificationService) {
    this.initial();
  }

  private initial(): void {
    this.categoryForm = new FormGroup({
      categoryId: new FormControl('', {
        validators: [
          Validators.nullValidator,
          Validators.required,
          MyValidators.EN(),
        ],
        updateOn: 'blur',
      }),
      categoryName: new FormControl('', {
        validators: [Validators.nullValidator, Validators.required],
      }),
      classHour:new FormControl(32,{
        validators:[Validators.nullValidator,Validators.required,Validators.max(100),Validators.min(2)]
      }),
      description: new FormControl('', {
        validators: [Validators.nullValidator, Validators.required],
        updateOn: 'blur',
      }),
    });
    this.categroyIdControl = this.categoryForm.controls['categoryId'];
    this.categroyIdControl.setAsyncValidators(
      this.certificationService.isCategoryIdUnique()
    );
    this.classHourControl=this.categoryForm.controls['classHour'];
    this.categoryNameControl = this.categoryForm.controls['categoryName'];
    this.descriptionControl = this.categoryForm.controls['description'];
  }

  public createCertificationCategory(): void {
    this.spinningFlag = true;
    this.certificationService
      .createCertificationCategory({
        id: <string>this.categroyIdControl.value,
        name: <string>this.categoryNameControl.value,
        description: <string>this.descriptionControl.value,
        timeStamp: 0,
        userId: 'null',
        state: '使用中',
        classHour:<number>this.classHourControl.value
      })
      .then((res: Boolean) => {
        if (res) {
         this.categoryForm.reset();
        }
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }
  ngOnInit() {}
}
