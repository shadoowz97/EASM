/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-01-23 23:06:59
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-27 12:07:49
 */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseEmployee } from '../dataDef/BaseEmployee';
import { UserService } from '../service/user-service/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-employee-Detail',
  templateUrl: './employee-Detail.component.html',
  styleUrls: ['./employee-Detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  private subscribtions: Subscription[] = [];
  protected currentId: string;
  employeeInfo: BaseEmployee;
  canEdit: boolean;
  editMode: Boolean = false;
  showEditButton: Boolean = false;
  saveLoading: Boolean = false;
  oriIntroduction: string;
  unSavedModalVisable: boolean = false;
  constructor(private router: ActivatedRoute, private usrService: UserService) {
    this.subscribtions.push(
      router.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (this.currentId !== id) {
          this.currentId = id;
          this.usrService.employeeDetail(id).then((employee: BaseEmployee) => {
            this.employeeInfo = employee;
            if (this.employeeInfo.introduction == undefined) {
              this.employeeInfo.introduction = '无';
            }
            this.oriIntroduction = this.employeeInfo.introduction;
            this.canEdit =
              this.currentId == this.usrService.accessUserModel().userId ||
              this.usrService.hasRole('admin');
          });
        }
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscribtions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  public editTitle(){

  }

  public editDepartment(){
    
  }
  public show(): void {
    alert(this.employeeInfo.introduction);
  }

  public save() {
    this.saveLoading = true;
    this.usrService
      .changeEmployeeIntroduction(
        this.employeeInfo.employeeId,
        this.employeeInfo.introduction
      )
      .then((res: boolean) => {
        if (res) {
          this.saveLoading = false;
          this.oriIntroduction = this.employeeInfo.introduction;
        }
      })
      .finally(() => {
        this.saveLoading = false;
      });
  }
  public cancelEdit() {
    if (this.oriIntroduction !== this.employeeInfo.introduction) {
      this.unSavedModalVisable = true;
    } else {
      this.editMode = false;
    }
  }

  public onEditorCreated(editor) {
    this.showEditButton = true;
  }

  public handleOnOk() {
    this.unSavedModalVisable = false;
    this.employeeInfo.introduction = this.oriIntroduction;
    this.editMode = false;
  }

  public handleOnCancel() {
    this.unSavedModalVisable = false;
  }
  public edit(): void {
    this.editMode = true;
  }
}
