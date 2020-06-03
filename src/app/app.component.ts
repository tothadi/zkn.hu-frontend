import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zalai Közszolgáltató Nonprofit Kft';
  show: boolean;

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (this.location.path() === '/admin' || this.location.path() === '/merleg') {
        this.show = false;
      } else {
        this.show = true;
      }
    });
  }
}
