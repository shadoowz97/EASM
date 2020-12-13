/*
 * @Descripttion: 
 * @version: 
 * @Author: Shadoowz
 * @Date: 2020-07-09 17:10:35
 * @LastEditors: Shadoowz
 * @LastEditTime: 2020-12-08 16:20:07
 */
import { Component, OnInit, Input } from '@angular/core';
import { TabService } from "../tab.service"
declare var $:any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  @Input() root;
  constructor(private tabService:TabService) { 

  }
  addToTabList(id,url,title,param=[]){
    let npath=[]
    this.tabService.addTab(id,url,title,param,false)
  }

  ngOnInit() {
    $('.sidebar-scroll').slimScroll({
      height: '95%',
      wheelStep: 2,
    });
    $('.btn-toggle-fullwidth').on('click', function() {
      if(!$('body').hasClass('layout-fullwidth')) {
        $('body').addClass('layout-fullwidth');
      } else {
        $('body').removeClass('layout-fullwidth');
        $('body').removeClass('layout-default'); // also remove default behaviour if set
      }
      $(this).find('.lnr').toggleClass('lnr-arrow-left-circle lnr-arrow-right-circle');
      if($(window).innerWidth() < 1025) {
        if(!$('body').hasClass('offcanvas-active')) {
          $('body').addClass('offcanvas-active');
        } else {
          $('body').removeClass('offcanvas-active');
        }
      }
    });
    $(window).on('load', function() {
      if($(window).innerWidth() < 1025) {
        $('.btn-toggle-fullwidth').find('.icon-arrows')
        .removeClass('icon-arrows-move-left')
        .addClass('icon-arrows-move-right');
      }
      // adjust right sidebar top position
      $('.right-sidebar').css('top', $('.navbar').innerHeight());
      // if page has content-menu, set top padding of main-content
      if($('.has-content-menu').length > 0) {
        $('.navbar + .main-content').css('padding-top', $('.navbar').innerHeight());
      }
      // for shorter main content
      if($('.main').height() < $('#sidebar-nav').height()) {
        $('.main').css('min-height', $('#sidebar-nav').height());
      }
    });
  }

}
