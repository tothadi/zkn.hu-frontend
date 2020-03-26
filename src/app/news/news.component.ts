import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsCont = [
    {
      id: '20200325_01',
      title: 'Hold on to your butts',
      month: '03',
      day: '25',
      text: 'The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother\'s keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.'
    }
  ]

  constructor(private NewsService: NewsService) { }

  ngOnInit() {
    this.NewsService.getNews().subscribe(news => {
      for (var i = 0; i < news.length; i++) {
        this.newsCont.unshift(news[i])
      }
    }, (err) => {
      console.error(err)
    })
  }

}
