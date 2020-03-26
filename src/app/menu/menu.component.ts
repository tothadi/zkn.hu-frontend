import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showFull: boolean;
  slides = ['dia1', 'dia2', 'dia3', 'dia4'];

  startSlide;

  constructor(private location: Location, private router: Router) {

  }

  sliding() {
    this.startSlide = setInterval(() => {
      this.slides.push(this.slides.shift())
    }, 5000)
  }


  stopSlide() {
    clearInterval(this.startSlide)
  }

  ngOnInit(): void {
    this.sliding()
    this.router.events.subscribe(event => {
      if (this.location.path() === '/home') {
        this.showFull = true;
      } else {
        this.showFull = false;
      }
    });
  }

}
