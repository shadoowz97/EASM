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
  categoryEn: AbstractControl;
  categoryForm: FormGroup;
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
      categoryEn: new FormControl('', [
        Validators.nullValidator,
        MyValidators.EN(),
        Validators.required,
      ]),
      categoryDescription: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
      categoryId: new FormControl('', [
        this.uniqueCategory(),
        MyValidators.UpperCase(),
        Validators.nullValidator,
        Validators.required,
      ]),
    });
    this.categoryName = this.categoryForm.controls['categoryName'];
    this.categoryId = this.categoryForm.controls['categoryId'];
    this.categoryEn = this.categoryForm.controls['categoryEn'];
    this.categoryDescription = this.categoryForm.controls[
      'categoryDescription'
    ];
  }

  createCategory() {
    let res: { [key: string]: any } = this.courseService.createCategory(
      <string>this.categoryId.value,
      <string>this.categoryName.value,
      <string>this.categoryEn.value,
      <string>this.categoryDescription.value
    );
    if(res['code']==200){
      res['message']()
      this.initial()
    }
  }

  uniqueCategory(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let flag = this.courseService.hasCategory(<string>control.value);
      return flag ? { notunique: { value: control.value } } : null;
    };
  }
  ngOnInit(): void {}
}
