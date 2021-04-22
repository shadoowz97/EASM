/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2020-07-16 16:32:09
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-03 11:26:53
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable, Observer, Subscription } from 'rxjs';
import { Category } from 'src/app/dataDef/Category';
import { Course } from 'src/app/dataDef/Course';
import { ResSet } from 'src/app/dataDef/ResSet';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private category: Category[] = [];
  private courses: Course[] = [];
  private courseObserve: Observer<Course[]>[] = [];
  private categoryObserve: Observer<Category[]>[] = [];
  private courseObservable: Observable<Course[]> = new Observable<Course[]>(
    (observe: Observer<Course[]>) => {
      console.log('订阅成功');
      observe.next(this.courses);
      this.courseObserve.push(observe);
      return new Subscription(() => {
        this.courseObserve.splice(this.courseObserve.indexOf(observe), 1);
      });
    }
  );
  private categoryObservable: Observable<Category[]> = new Observable<
    Category[]
  >((observe: Observer<Category[]>) => {
    observe.next(this.category);
    this.categoryObserve.push(observe);
    return new Subscription(() => {
      this.categoryObserve.splice(this.categoryObserve.indexOf(observe), 1);
    });
  });
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private msg: NzMessageService
  ) {
    this.loadCategory();
    this.loadCourse();
  }

  public getCourses(): Observable<Course[]> {
    return this.courseObservable;
  }

  public getCategories(): Observable<Category[]> {
    return this.categoryObservable;
  }
  public async deprecatedCourse(id: String): Promise<boolean> {
    return await this.http
      .delete('/api/course/deprecatedCourse/' + id, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.loadCourse();
          return true;
        } else return false;
      });
  }

  public async deleteCourse(id: String): Promise<boolean> {
    return await this.http
      .delete('/api/course/deleteCourse/' + id, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.loadCourse();
          this.msg.success('删除成功');
          this.courses = null;
          return true;
        } else return false;
      });
  }
  public async loadCourse() {
    await this.http
      .get('/api/course/queryAllCourse', { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.courses = res.data;
          this.courseObserve.forEach((observer: Observer<Course[]>) => {
            observer.next(this.courses);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async loadCategory() {
    await this.http
      .get('/api/course/queryAllCategory', { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.category = res.data;
          this.categoryObserve.forEach((o) => {
            o.next(this.category);
          });
        } else {
          this.msg.error('拉取课程目录失败');
        }
      })
      .catch((e) => {
        console.log(e);
        this.msg.error('拉取课程目录网络错误');
      });
  }

  public isCategoryIdUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/course/isCategoryIdUnique/' + control.value, {
          observe: 'body',
        })
        .toPromise()
        .then((res: ResSet) => {
          if (res.stateCode == 200) return null;
          else
            return {
              valid: false,
              required: true,
            };
        });
    };
  }
  public isCourseIdUnique(): AsyncValidatorFn {
    return async (
      control: AbstractControl
    ): Promise<ValidationErrors | null> => {
      return this.http
        .get('/api/course/isCourseIdUnique/' + control.value, {
          observe: 'body',
        })
        .toPromise()
        .then((res: ResSet) => {
          if (res.stateCode == 200) {
            return null;
          } else
            return {
              valid: false,
              required: true,
            };
        });
    };
  }
  public uploadImage(file: File) {
    const formData = new FormData();
    formData.append('id', 'test');
    formData.append('imageFile', file);
    this.http
      .post('/api/certification/uploadImage', formData)
      .toPromise()
      .then((res: ResSet) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  public async createCategory(
    id: String,
    name: String,
    description: String
  ): Promise<boolean> {
    var result = await this.http
      .post('/api/course/createCategory', {
        categoryId: id,
        categoryName: name,
        description: description,
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('创建成功');
          this.loadCategory();
          return Promise.resolve(true);
        } else {
          this.msg.error('创建失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络资源错误');
        return Promise.resolve(false);
      });
    return result;
  }
  public async createCourse(
    id: string,
    category: string,
    name: string,
    description: String
  ): Promise<boolean> {
    var res = await this.http
      .post('/api/course/createCourse', {
        courseName: name,
        courseId: id,
        categoryId: category,
        description: description,
        state: 'active',
      })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.msg.success('创建成功');
          this.loadCourse();
          return Promise.resolve(true);
        } else {
          this.msg.error('创建失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        console.log(e);
        this.msg.error('网络资源错误');
        return Promise.resolve(false);
      });
    return res;
  }
  public queryCourse(category, term) {
    return this.courses;
  }

  public async deleteCategory(id: String): Promise<boolean> {
    var r = await this.http
      .delete('/api/course/deleteCategory/' + id, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.loadCategory();
          this.msg.success('删除成功');
          return Promise.resolve(true);
        } else {
          this.msg.error(res.message);
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络资源错误');
        return Promise.resolve(false);
      });
    return r;
  }

  public async deprecatedCategory(id: String): Promise<boolean> {
    var r = this.http
      .delete('/api/course/deprecatedCategory/' + id, { observe: 'body' })
      .toPromise()
      .then((res: ResSet) => {
        if (res.stateCode == 200) {
          this.loadCategory();
          this.msg.success('废弃成功');
          return Promise.resolve(true);
        } else {
          this.msg.error('废弃失败');
          return Promise.resolve(false);
        }
      })
      .catch((e) => {
        this.msg.error('网络资源错误');
        return Promise.resolve(false);
      });
    return r;
  }
}
