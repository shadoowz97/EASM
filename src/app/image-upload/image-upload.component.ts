/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2021-04-02 21:52:45
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-04-23 06:27:19
 */
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course-service/course.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  file: File;
  constructor(private cs:CourseService) {}
  handleFileChange($event): void {
    this.file=$event.target.files[0];
    console.log(this.file);
    this.cs.uploadImage(this.file)
  }
  ngOnInit() {}
}
