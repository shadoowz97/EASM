import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course-service/course.service';
import { TabService } from '../tab.service'
@Component({
  selector: 'app-query-course',
  templateUrl: './query-course.component.html',
  styleUrls: ['./query-course.component.css'],
})
export class QueryCourseComponent implements OnInit {
  courseList=[];
  category=""
  termId=""
  constructor(private courseService:CourseService,private tavService:TabService) {}
  searchCourse(){
    this.courseList= this.courseService.queryCourse(this.category,this.termId)
  }
  ngOnInit() {}

  toDetail(courseId){
    let param=[courseId];
    this.tavService.addTab("course"+courseId,'courseDetail',"课程详情:"+courseId,param,false)
  }


}
