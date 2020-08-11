import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../service/course-service/course.service'

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  private categoryId;
  constructor(private route:ActivatedRoute,private courseService:CourseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.categoryId=params.get("categoryId")
    })
  }

}
