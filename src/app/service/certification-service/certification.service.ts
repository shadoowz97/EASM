/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-04-05 08:03:08
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-25 02:36:03
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer, Subscription } from 'rxjs';
import { ResSet } from 'src/app/dataDef/ResSet';
import { CertificationCategory } from '../../dataDef/CertificationCategory';
import { CertificationCourse } from '../../dataDef/certification-course';
import { CertificationStudent } from '../../dataDef/CertificationStudent';
import { CertificationCourseDetail } from '../../dataDef/CertificationCourseDetail';
import { TabService } from 'src/app/tab.service';
import { CertificationCourseStudentInfo } from 'src/app/dataDef/CertificationCourseStudentInfo';
import { CertificationStudentDetail } from 'src/app/dataDef/certification-student-detail';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  private latestCourseNum: number = 10;
  private certificationCategories: CertificationCategory[];
  private certificationCategoryObservers: Observer<
    CertificationCategory[]
  >[] = [];
  private CertificationCategoryObservable: Observable<
    CertificationCategory[]
  > = new Observable<CertificationCategory[]>(
    (observe: Observer<CertificationCategory[]>) => {
      console.log('订阅证书目录成功');
      this.certificationCategoryObservers.push(observe);
      if (this.certificationCategories == null) {
        this.queryCertificationCategory();
      } else {
        observe.next(this.certificationCategories);
      }
      return new Subscription(() => {
        this.certificationCategoryObservers.splice(
          this.certificationCategoryObservers.indexOf(observe),
          1
        );
      });
    }
  );

  private latestCertificationCourses: CertificationCourse[];
  private latestCertificationCoursesObservers: Observer<
    CertificationCourse[]
  >[] = [];
  private latestCertificationCoursesObservable: Observable<
    CertificationCourse[]
  > = new Observable<CertificationCourse[]>(
    (observer: Observer<CertificationCourse[]>) => {
      if (this.latestCertificationCourses == null) {
        this.queryLatestCertificationCourse();
      }
      this.latestCertificationCoursesObservers.push(observer);
      observer.next(this.latestCertificationCourses);
      return new Subscription(() => {
        this.latestCertificationCoursesObservers.splice(
          this.latestCertificationCoursesObservers.indexOf(observer),
          1
        );
      });
    }
  );
  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private tabService: TabService
  ) {}

  public getCertificationCategories(): Observable<CertificationCategory[]> {
    return this.CertificationCategoryObservable;
  }

  public getLatestCertificationCourse(): Observable<CertificationCourse[]> {
    return this.latestCertificationCoursesObservable;
  }
  public checkCategoryIdUnique(
    certificationCategoryId: String
  ): Promise<Boolean | null> {
    return this.http
      .get(
        '/api/certification/checkCertificationCategoryId/' +
          certificationCategoryId
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data);
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
  public isCategoryIdUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.checkCategoryIdUnique(control.value).then(
        (value: Boolean) => {
          return value ? null : { valid: false, required: true };
        }
      );
    };
  }

  public async createCertificationCategory(
    category: CertificationCategory
  ): Promise<Boolean> {
    return this.http
      .post('/api/certification/createCategory', category, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('创建成功');
          this.queryCertificationCategory();
          return Promise.resolve(true);
        } else {
          this.msg.error('创建失败 : ' + res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
  }

  public async deleteCategory(categoryId: String): Promise<Boolean | null> {
    return this.http
      .delete('/api/certification/deleteCategory/' + categoryId)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.queryCertificationCategory();
          this.msg.success('删除成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('删除失败 : ' + res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('删除失败 ：网络错误');
        return Promise.resolve(false);
      });
  }
  public activeCertificationCategory(categoryId: string): Promise<Boolean> {
    return this.http
      .put('/api/certification/activeCategory/' + categoryId, '', {
        observe: 'body',
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.queryCertificationCategory();
          this.msg.success('激活证书类型');
          return Promise.resolve(true);
        } else {
          this.msg.error('激活失败 : ' + res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('激活失败 : 网络错误');
        return Promise.resolve(false);
      });
  }

  public discardCertificationCategory(
    categoryId: String
  ): Promise<Boolean | null> {
    return this.http
      .put('/api/certification/discardCategory/' + categoryId, null)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.queryCertificationCategory();
          this.msg.success('成功废弃证书');
          return Promise.resolve(true);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('操作失败 : 网络错误');
        return Promise.resolve(false);
      });
  }
  public queryCertificationCategory(): void {
    this.certificationCategoryObservers.forEach(
      (observer: Observer<CertificationCategory[]>) => {
        observer.next(null);
      }
    );
    this.http
      .get('/api/certification/queryCategory')
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.certificationCategories = res.data;
          this.certificationCategoryObservers.forEach(
            (observer: Observer<CertificationCategory[]>) => {
              observer.next(this.certificationCategories);
            }
          );
          this.latestCertificationCoursesObservers.forEach((o) => {
            o.next(this.latestCertificationCourses);
          });
        }
      });
  }
  private checkCertificationCourseIdUnique(courseId: string): Promise<Boolean> {
    return this.http
      .get('/api/certification/checkCertificationCourseIdUnique/' + courseId)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
  }

  public isCertificationCourseIdUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.checkCertificationCourseIdUnique(<string>control.value).then(
        (res: Boolean) => {
          return res ? null : { isUnique: false };
        }
      );
    };
  }

  public createCertificationCourse(
    certificationCourse: CertificationCourse
  ): Promise<Boolean> {
    return this.http
      .post('/api/certification/createCertificationCourse', certificationCourse)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('创建成功');
          this.queryCertificationCategory();
          return Promise.resolve(true);
        } else {
          this.msg.error('创建失败 ：' + res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('创建失败 : 网络错误');
        return Promise.resolve(false);
      });
  }

  public queryLatestCertificationCourse(): Promise<CertificationCourse[]> {
    return this.http
      .get(
        '/api/certification/queryLatestCertificationCourse/' +
          this.latestCourseNum
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.latestCertificationCourses = res.data;
          this.latestCertificationCoursesObservers.forEach(
            (observer: Observer<CertificationCourse[]>) => {
              observer.next(res.data as CertificationCourse[]);
            }
          );
          return Promise.resolve(res.data);
        } else {
          this.msg.error('查询失败');
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        return Promise.resolve(null);
      });
  }

  public queryCertificationCourseByTime(
    startDate: number,
    endDate: number
  ): Promise<CertificationCourse[]> {
    return this.http
      .get(
        '/api/certification/queryCertificationCourseByTime/' +
          startDate +
          '/' +
          endDate
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('查询成功');
          return Promise.resolve(res.data);
        } else {
          this.msg.error('查询失败');
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(null);
      });
  }

  public deleteCertificationCourse(courseId: string): Promise<Boolean> {
    return this.http
      .delete('/api/certification/deleteCertificationCourse/' + courseId)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('删除成功');
          this.queryLatestCertificationCourse();
          return Promise.resolve(true);
        } else {
          this.msg.error('删除失败 ：该课程可能已经存在挂靠的证书');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('删除失败 : 网络或服务器内部错误');
        return Promise.resolve(false);
      });
  }

  private pushLatestCertificationCourse(
    certificationCourses: CertificationCourse[]
  ): void {
    this.latestCertificationCoursesObservers.forEach((o) => {
      o.next(certificationCourses);
    });
  }

  private pushCertificationCategory(
    certificationCategory: CertificationCategory[]
  ): void {
    this.certificationCategoryObservers.forEach((o) => {
      o.next(certificationCategory);
    });
  }

  public createCertificationStudent(
    student: CertificationStudent
  ): Promise<Boolean> {
    return this.http
      .post('/api/certification/createCertificationStudent', student)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('创建成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('创建失败 ：' + res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(false);
      });
  }
  public queryCertificationStudentByAffiliation(
    affiliation: string
  ): Promise<CertificationStudent[]> {
    return this.http
      .get(
        '/api/certification/queryCertificationStudentByAffiliation/' +
          affiliation
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data as CertificationStudent[]);
        } else {
          this.msg.error('查询失败：' + res.message);
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(null);
      });
  }

  public queryCertificationStudentByID(
    id: string
  ): Promise<CertificationStudent> {
    return this.http
      .post('/api/certification//queryCertificationStudentByPRCID', id)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data as CertificationStudent);
        } else {
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        return Promise.resolve(null);
      });
  }

  public isPRCIDUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.queryCertificationStudentByID(control.value as string).then(
        (student: CertificationStudent) => {
          return student == null ? null : { error: 'prcID exist' };
        }
      );
    };
  }

  public queryCertificationDetail(
    courseId: string
  ): Promise<CertificationCourseDetail> {
    return this.http
      .get('/api/certification/queryCertificationCourseDetail/' + courseId)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data as CertificationCourseDetail);
        } else {
          this.msg.error('查询详情失败');
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        this.msg.error('网络错误');
        return Promise.resolve(null);
      });
  }

  public toCertificationCourseDetail(courseId: string): void {
    this.tabService.addTab(
      'certificationcourse' + courseId,
      'certificationCourseDetail',
      '培训详情' + courseId,
      [courseId],
      false
    );
  }

  public toCertificationStudentDetail(studentId: string): void {
    this.tabService.addTab(
      'certificationstudent' + studentId,
      'certificationstudentDetail',
      '学员详情' + studentId,
      [studentId],
      false
    );
  }

  public addStudentToCertificationCourse(
    certificationCourseStudentInfo: CertificationCourseStudentInfo
  ): Promise<Boolean | null> {
    return this.http
      .post(
        '/api/certification/addStudentToCertificationCourse',
        certificationCourseStudentInfo
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('添加成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('添加失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('添加失败');
        return Promise.resolve(false);
      });
  }

  public uploadCertificationFile(
    prcId: string,
    courseId: string,
    file: File
  ): Promise<string[]> {
    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('courseID', courseId);
    formData.append('prcID', prcId);
    formData.append('certificationId', '');
    return this.http
      .post('/api/certification/uploadCertificationFile', formData)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data);
        } else {
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        return Promise.resolve(null);
      });
  }

  public queryCertificationStudentDetail(
    prcID: string
  ): Promise<CertificationStudentDetail> {
    return this.http
      .get('/api/certification/query/' + prcID)
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          return Promise.resolve(res.data as CertificationStudentDetail);
        } else {
          this.msg.error('未找到相关信息！');
          return Promise.resolve(null);
        }
      })
      .catch((e) => {
        this.msg.error('服务器内部错误');
        return Promise.resolve(null);
      });
  }

  public revokeCertification(
    prcId: string,
    courseID: string,
    fileName: string
  ): Promise<Boolean> {
    return this.http
      .delete(
        '/api/certification/revokeCertification/' +
          prcId +
          '/' +
          courseID +
          '/' +
          fileName.substring(0, fileName.indexOf('.')) +
          '/' +
          fileName.substring(fileName.lastIndexOf('.') + 1),
        { observe: 'body' }
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('收回证书成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('收回证书失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('服务器内部错误');
        return Promise.resolve(false);
      });
  }

  public deleteStudentFromCertificationCourse(
    prcID: string,
    courseId: string
  ): Promise<Boolean> {
    return this.http
      .delete(
        '/api/certification/deleteStudentFromCertificationCourse/' +
          courseId +
          '/' +
          prcID
      )
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('删除成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('删除失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('删除失败：网络错误');
        return Promise.resolve(false);
      });
  }
}
