import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu, 'hu');

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  newsCont = [

  ]

  selectedYear: number

  @Input() set selectedMonth(newMonth: number) {
    this.show(newMonth);
  }

  years = []
  months = []
  /*
  picWidth(i: number) {
    let count = this.newsCont[i].pics.length
    let width = `${count * 100}%`
    return width;
  }*/

  public toLeft(i: number) {
    let count = this.newsCont[i].pics.length
    let last = this.newsCont[i].pics[count - 1]
    this.newsCont[i].pics.pop()
    this.newsCont[i].pics.unshift(last)
  }

  toRight(i: number) {
    let first = this.newsCont[i].pics[0]
    this.newsCont[i].pics.shift()
    this.newsCont[i].pics.push(first)
  }

  uniq(a) {
    return Array.from(new Set(a));
  }

  constructor(private NewsService: DataService) { }

  ngOnInit() {

    //this.selectedYear = new Date().getFullYear()
    //this.selectedMonth = new Date().getMonth() + 1

    this.NewsService.getArchives().subscribe(news$ => {
      let news = JSON.parse(news$)
      for (var i = 0; i < news.length; i++) {

        let date = new Date(news[i].date)
        let year = date.getFullYear()
        let month = date.getMonth() + 1

        this.years.push(year)
        this.months.push(month)
        
        this.newsCont.push(news[i])
      }
    }, (err) => {
      console.error(err)
    }, () => {
      const y = new Set(this.years)
      const m = new Set(this.months)

      this.years = [...y]
      this.months = [...m]
    })

  }

  private show(input: number) {

    for (var i = 0; i < this.newsCont.length; i++) {

      let date = new Date(this.newsCont[i].date)
      let year = date.getFullYear()
      let month = date.getMonth() + 1

      if (year == this.selectedYear && month == input) {
        this.newsCont[i].show = true
      } else {
        this.newsCont[i].show = false
      }
    }
  }

}
