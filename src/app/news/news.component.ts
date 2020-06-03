import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu, 'hu');

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsCont = []

  p: number = 1;

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

  constructor(private NewsService: NewsService) { }

  ngOnInit() {
    this.NewsService.getNews().subscribe(news$ => {
      let news = JSON.parse(news$)
      for (var i = 0; i < news.length; i++) {
        this.newsCont.push(news[i])
      }
    }, (err) => {
      console.error(err)
    })
  }

}
