import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { NewsService, News } from '../news.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  id: string;
  title: string;
  month: string;
  day: string;
  text: string;
  sent_1 = 'Hír mentése...';
  sent_2 = 'Hír elmentve!';
  sent_3 = 'Próbálja meg újra!';
  status = 1;

  sent = 'Hír mentése...';

  submitted = false;

  constructor(private NewsService: NewsService, public dialog: MatDialog) { }

  saveNews() {
    this.submitted = true;
    let now = new Date();
    let month = now.getMonth() + 1;
    if (month < 10) {
      this.month = '0' + month
    } else {
      this.month = month.toString();
    }
    let day = now.getDate();
    if (day < 10) {
      this.day = '0' + day
    } else {
      this.day = day.toString();
    }

    let newsBlock: News = { id: this.id, title: this.title, month: this.month, day: this.day, text: this.text };
    this.NewsService.addNews(newsBlock).subscribe(status => {
      if (status) {
        setTimeout(() => {
          this.sent = this.sent_2;
          this.status = 2;
        }, 2000);
        setTimeout(() => {
          this.submitted = false;
          this.status = 1;
        }, 5000);
      } else {
        setTimeout(() => {
          this.sent = this.sent_3;
          this.status = 3;
        }, 2000);
        setTimeout(() => {
          this.submitted = false;
          this.status = 1;
        }, 5000);
      }
    }, (err) => {
      console.error(err)
    });
  }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' });
  }

  ngOnInit() {
  }

}
