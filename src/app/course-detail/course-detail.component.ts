import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course-service/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courseId;
  constructor(private courseService:CourseService,private route:ActivatedRoute) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.courseId=params.get("courseId")
    })
  }

}
