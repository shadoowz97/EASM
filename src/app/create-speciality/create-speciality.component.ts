import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';

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
  constructor() {}
  ngOnInit() {
    this.initial();
  }
  private initial() {
    this.specialityForm = new FormGroup({
      specialityIdControl: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
      ]),
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
      ]),
    });
    this.specialityEnControl = this.specialityForm.controls[
      'specialityEnControl'
    ];
    this.specialityIdControl = this.specialityForm.controls[
      'specialityIdControl'
    ];
    this.specialityNameControl = this.specialityForm.controls[
      'specialityNameControl'
    ];
    this.specialityYear = this.specialityForm.controls['specialityYear'];
  }
}
