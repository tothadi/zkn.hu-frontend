import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  introtext: string
  sign: string
  rank: string
  date: Date

  constructor(public router: Router, private introService: DataService) { }

  ngOnInit() {
    this.router.navigate(['/'])
    this.introService.getIntro().subscribe(intro$ => {
      const intro = JSON.parse(intro$)
      this.introtext = intro[0].text
      this.date = intro[0].date
      this.sign = intro[0].sign
      this.rank = intro[0].rank
    }, (err) => {
      console.error(err)
    })
  }

}
