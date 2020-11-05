import { Injectable } from '@angular/core';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  category = [
    {
      id: 'TC',
      name: '技术',
      enName: 'Tecnology',
      description: '信息技术类课程',
    },
    {
      id: 'AC',
      name: '知识组织',
      enName: 'acknowledge',
      description: '信息组织类课程',
    },
  ];
  courses = [
    {
      id: '000001',
      category: 'TC',
      name: '文本分析与数据处理',
      creator: '李惟依老师',
      createdTime: '20190131',
    },
    {
      id: '000002',
      category: 'AC',
      name: '信息咨询',
      creator: '张影',
      createdTime: '20200716',
    },
  ];
  constructor(private userService: UserService) {}
  public courseDetail(courseId) {
    for (let c of this.courses) {
      if (courseId == c.id) return c;
    }
    return null;
  }
  public queryCategory(id:string,name:string){
    return this.category
  }
  public getCategory(id: string) {
    console.log(id);
    for (let c of this.category) {
      if (c.id == id) {
        return c;
      }
    }
    return null;
  }
  public getAllCategory() {}
  public hasCategory(cId): boolean {
    for (let c of this.category) {
      if (c.id == cId) return true;
    }
    return false;
  }
  createCategory(
    id: string,
    name: string,
    en: string,
    description: string
  ): { [key: string]: any } {
    this.category.push({
      id: id,
      name: name,
      enName: en,
      description: description,
    });
    return {
      code:200,
      message:function(){
        alert("添加成功！")
      }
    }
  }
  public createCourse(id: string, category: string, name: string) {
    let username:string = this.userService.getUserName().toString();
    this.courses.push({
      id: id,
      category: category,
      name: name,
      creator: username,
      createdTime: new Date('YYYY-MM-DD').toString(),
    });
  }
  public queryCourse(category, term) {
    return this.courses;
  }
}
