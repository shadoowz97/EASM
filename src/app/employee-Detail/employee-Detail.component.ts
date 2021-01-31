/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-01-23 23:06:59
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-31 23:23:34
 */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseEmployee } from '../dataDef/BaseEmployee';
import { Role } from '../dataDef/Role';
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
  canAddRole = false;
  canRemoveRole = false;
  addRoleList: Role[];
  removeRoleList: Role[];
  isLoadingInfo = false;
  addRoleVisable = false;
  addRoleId: number = null;
  addOkButtonLoading = false;
  removeRoleVisable = false;
  removeRoleId: number = null;
  removeOkButtonLoading = false;
  constructor(private router: ActivatedRoute, private usrService: UserService) {
    this.subscribtions.push(
      router.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (this.currentId !== id) {
          this.currentId = id;
          this.reloadEmpoloyeeInfo();
        }
      })
    );
  }
  addRole() {
    this.addRoleVisable = true;
    this.addRoleId = this.addRoleList[0].rid;
  }
  removeRole() {
    this.removeRoleVisable = true;
    this.removeRoleId = this.removeRoleList[0].rid;
  }
  caculateRoleList(): void {
    console.log(this.usrService.canGrantRoles());
    this.removeRoleList = this.usrService
      .canGrantRoles()
      .filter((role: Role) => {
        for (let r of this.employeeInfo.roles) {
          if (r.rid === role.rid) {
            console.log(r.rid);
            return true;
          }
        }
        return false;
      });
    this.addRoleList = this.usrService.canGrantRoles().filter((role: Role) => {
      for (let r of this.employeeInfo.roles) {
        if (r.rid === role.rid) return false;
      }
      console.log(role.nameZH);
      return true;
    });
  }

  reloadEmpoloyeeInfo(): void {
    this.isLoadingInfo = true;
    this.usrService
      .employeeDetail(this.currentId)
      .then((employee: BaseEmployee) => {
        this.employeeInfo = employee;
        if (this.employeeInfo.introduction == undefined) {
          this.employeeInfo.introduction = '无';
        }
        this.oriIntroduction = this.employeeInfo.introduction;
        this.canEdit =
          this.currentId == this.usrService.accessUserModel().userId ||
          this.usrService.hasRole('admin');
        this.caculateRoleList();
      })
      .finally(() => {
        this.isLoadingInfo = false;
      });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.subscribtions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  public editTitle() {}
  public roleColor(id: number): string {
    return this.usrService.roleColor(id);
  }

  public roleSignal(id: number): string {
    return this.usrService.roleSignal(id);
  }

  public editDepartment() {}
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
  public addRoleAction() {
    this.addOkButtonLoading = true;
    this.usrService
      .grantRolesToUsr([this.addRoleId], this.employeeInfo.employeeId)
      .then((res: boolean) => {
        if (res) {
          this.addRoleVisable = false;
          this.reloadEmpoloyeeInfo();
        }
      })
      .finally(() => {
        this.addOkButtonLoading = false;
      });
  }
  revokeRoleAction() {
    this.removeOkButtonLoading = true;
    this.usrService
      .revokeRole(this.removeRoleId, this.employeeInfo.employeeId)
      .then((res: boolean) => {
        if (res) {
          this.removeRoleVisable = false;
          this.reloadEmpoloyeeInfo();
        }
      })
      .finally(() => {
        this.removeOkButtonLoading = false;
      });
  }
  public cancelRevokeModal(): void {
    this.removeRoleVisable = false;
  }
  public cancelAddModal(): void {
    this.addRoleVisable = false;
  }

  public handleOnCancel() {
    this.unSavedModalVisable = false;
  }
  public edit(): void {
    this.editMode = true;
  }
}
