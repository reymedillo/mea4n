import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
// import initDemo = require('../../assets/js/charts.js');
declare var $: any;
@Component({
  selector: 'app-home',
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.notify({
      icon: "notifications",
      message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."
    });
    // initDemo();
  }

}
