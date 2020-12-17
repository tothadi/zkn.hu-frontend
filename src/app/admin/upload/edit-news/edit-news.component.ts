import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UploadService } from '../upload.service';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {


  title: string
  text: string
  sign: string
  rank: string

  newsUrl = '/api/upload'

  news = {
    title: '',
    text: '',
    sign: '',
    rank: '',
    picCount: 0
  }

  constructor(public dialog: MatDialog, public uploadService: UploadService, private NewsService: DataService) { }

  public uploadNewsDialog() {
    this.news.title = this.title
    let safetext = this.text
    this.news.text = `<p>${safetext}</p>`
    this.news.sign = this.sign
    this.news.rank = this.rank
    this.uploadService.getData(this.news, this.newsUrl)
    let dialogRef = this.dialog.open(DialogComponent, {
      id: 'upload-news',
      panelClass: 'overl',
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh'
    })
  }

  ngOnInit(): void {
  }

}
