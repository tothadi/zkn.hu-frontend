import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  showFull = true
  
  constructor(private location: Location, private router: Router) {

  }

  ngAfterViewInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/home') {
        this.showFull = true;
      } else {
        this.showFull = false;
      }
    })

  }

  ngOnInit(): void {

    if (this.location.path() === '/home') {
      this.showFull = true;
    } else {
      this.showFull = false;
    }
  }

}
