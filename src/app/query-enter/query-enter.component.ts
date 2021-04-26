/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-25 10:11:55
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 10:26:44
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';
import { MyValidators } from '../util/MyVaildators';

@Component({
  selector: 'app-query-enter',
  templateUrl: './query-enter.component.html',
  styleUrls: ['./query-enter.component.scss'],
})
export class QueryEnterComponent implements OnInit {
  qForm: FormGroup;
  constructor(private userService: UserService, private router: Router) {
    this.userService.changeUserState(2);
    console.log('change success');
    this.qForm = new FormGroup({
      prcID: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
        MyValidators.PRCID(),
      ]),
      usrName: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }
  public query(): void {
    this.router.navigate([
      'certificationstudentDetail',
      this.qForm.controls['prcID'].value as string,
    ]);
  }
  ngOnInit() {}
}
