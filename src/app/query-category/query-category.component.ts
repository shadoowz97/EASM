import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course-service/course.service';
import { TabService } from '../tab.service'
@Component({
  selector: 'app-query-category',
  templateUrl: './query-category.component.html',
  styleUrls: ['./query-category.component.css'],
})
export class QueryCategoryComponent implements OnInit {
  categoryList=[];
  categoryId=""
  categoryName=""
  constructor(private courseService:CourseService,private tavService:TabService) {}
  searchCategory(){
    this.categoryList= this.courseService.queryCategory(this.categoryId,this.categoryName)
  }
  ngOnInit() {}

  toCategoryDetail(categoryId){
    let param=[categoryId];
    this.tavService.addTab("course"+categoryId,'categoryDetail',"分类详情:"+categoryId,param,false)
  }


}
