import { Component, OnInit } from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  location: Location;
  constructor(location:Location) {
      this.location = location;
  }
  ngOnInit() {
      $.getScript('../assets/js/material-dashboard.js');
      $.getScript('../assets/js/initMenu.js');
  }
}
