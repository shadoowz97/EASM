/*
 * @Descripttion:
 * @version:
 * @Author: Shadoowz
 * @Date: 2021-01-28 09:15:32
 * @LastEditors: Shadoowz
 * @LastEditTime: 2021-01-28 19:23:19
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-supervisor-relation',
  templateUrl: './student-supervisor-relation.component.html',
  styleUrls: ['./student-supervisor-relation.component.css'],
})
export class StudentSupervisorRelationComponent implements OnInit {
  spinningFlag: boolean = false;
  current: number = 0;
  
  constructor() {}

  ngOnInit() {}
}
