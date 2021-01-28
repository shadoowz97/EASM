/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-12-16 16:19:43
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-28 08:34:04
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdministrativeClazzDetail } from '../dataDef/AdministrativeClazzDetail';
import { BaseStudent } from '../dataDef/base-student';
import { AdministrativeClazzService } from '../service/ad-clazz/administrative-clazz.service';
import { UserService } from '../service/user-service/user.service';

@Component({
  selector: 'app-adClazz-Detail',
  templateUrl: './adClazz-Detail.component.html',
  styleUrls: ['./adClazz-Detail.component.css'],
})
export class AdClazzDetailComponent implements OnInit, OnDestroy {
  id: string = null;
  spinningFlag = false;
  administrativeClazz: AdministrativeClazzDetail;
  private subscriptions: Subscription[] = [];
  stateEditorVisable: Boolean = false;
  templateState: string = '';
  states: string[];
  editedStudent: BaseStudent;
  okLoadingFlag: boolean = false;
  studentColConfig = [
    {
      name: '学号',
      size: '100px',
    },
    {
      name: '姓名',
      size: '100px',
    },
    {
      name: '所在中心',
      size: '150px',
    },
    {
      name: '专业名称',
      size: '150px',
    },
    {
      name: '学生状态',
      size: '150px',
    },
  ];
  constructor(
    private router: ActivatedRoute,
    private adClazzService: AdministrativeClazzService,
    private usrService: UserService
  ) {
    this.states = this.usrService.getAllStudentState();
    console.log(this.states);
    this.spinningFlag = true;
    this.subscriptions.push(
      this.router.paramMap.subscribe((params) => {
        var id = params.get('id');
        if (this.id != id) {
          this.adClazzService
            .queryAdministrativeClazzDetail(id)
            .then((adclazz) => {
              this.administrativeClazz = adclazz;
            })
            .finally(() => {
              this.spinningFlag = false;
            });
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((e) => {
      e.unsubscribe();
    });
  }
  public colorMap(state: string): string {
    return this.usrService.colorMap(state);
  }

  public editStudentState(student: BaseStudent): void {
    this.templateState = student.state;
    this.editedStudent = student;
    this.stateEditorVisable = true;
  }

  public handleStateChangeOk(): void {
    if (this.templateState !== this.editedStudent.state) {
      this.okLoadingFlag = true;
      this.usrService
        .editStudentState(this.editedStudent.studentId, this.templateState)
        .then((res: Boolean) => {
          if (res) {
            this.stateEditorVisable = false;
            this.editedStudent.state = this.templateState;
            this.administrativeClazz.students = [].concat(
              this.administrativeClazz.students
            );
          }
        })
        .finally(() => {
          this.okLoadingFlag = false;
        });
    } else {
      this.stateEditorVisable = false;
    }
  }

  public handleStateChangeCancel(): void {
    this.stateEditorVisable = false;
  }

  ngOnInit() {}
}
