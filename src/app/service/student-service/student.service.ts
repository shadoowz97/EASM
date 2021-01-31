/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-01-29 17:36:26
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-29 21:28:28
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ResSet } from 'src/app/dataDef/ResSet';
import { TabService } from 'src/app/tab.service';
import { StudentDetail } from '../../dataDef/studentDetail';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private tabService: TabService
  ) {}

  public toStudentProfile(studentId: string): void {
    this.tabService.addTab(
      'studentDetail:' + studentId,
      'studentDetail',
      '学生档案 ：' + studentId,
      [studentId],
      false
    );
  }

  public establishRelation(
    studentId: string,
    supervisorId: string,
    type: number
  ): Promise<boolean | null> {
    return this.http
      .put(
        '/api/usr/establish/MentoringRelationship/' +
          studentId +
          '/' +
          supervisorId +
          '/' +
          type,
        null,
        {
          observe: 'body',
        }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode === 200) {
          this.msg.success('建立成功');
          return Promise.resolve(true);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
  }

  public queryStudentProfile(studentId: string): Promise<StudentDetail | null> {
    return this.http
      .get('/api/usr/student/queryProfile/' + studentId, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode === 200) {
          return Promise.resolve(res.data);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(null);
        console.log(e);
      });
  }
}
