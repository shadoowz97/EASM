/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-26 21:28:10
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-15 21:08:14
 */
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course-service/course.service';
import {
  AbstractControl,
  FormGroup,
  FormControlName,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { MyValidators } from '../util/MyVaildators';

@Component({
  selector: 'app-create-term',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  categoryName: AbstractControl;
  categoryId: AbstractControl;
  categoryDescription: AbstractControl;
  categoryForm: FormGroup;
  spinningFlag: boolean = false;
  constructor(private courseService: CourseService) {
    this.initial();
  }
  private initial(): void {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', [
        Validators.nullValidator,
        MyValidators.CN(),
        Validators.required,
      ]),
      categoryDescription: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
      categoryId: new FormControl('', {validators:[
        MyValidators.UpperCase(),
        Validators.nullValidator,
        Validators.required,
      ],updateOn:'blur'}),
    });
    this.categoryName = this.categoryForm.controls['categoryName'];
    this.categoryId = this.categoryForm.controls['categoryId'];
    this.categoryId.setAsyncValidators(this.courseService.isCategoryIdUnique())
    this.categoryDescription = this.categoryForm.controls[
      'categoryDescription'
    ];
  }

  createCategory() {
    this.spinningFlag = true;
    this.courseService
      .createCategory(
        this.categoryId.value,
        this.categoryName.value,
        this.categoryDescription.value
      )
      .then((res: boolean) => {
        if (res) this.categoryForm.reset();
      })
      .finally(() => {
        this.spinningFlag = false;
      });
  }

  ngOnInit(): void {}
}
