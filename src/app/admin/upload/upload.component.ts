import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';
import { NewsService, News } from '../../news.service';
import { ActivitiesService } from 'src/app/activities.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

    title: string
    text: string
    sign: string
    rank: string

    catTitle: string
    catText: string

    newsUrl = '/api/upload'
    selectiveUrl = '/api/selectiveupdate'

    news = {
        title: '',
        text: '',
        sign: '',
        rank: '',
        picCount: 0
    }

    categories = []

    @Input() set selectedType(newType: string) {
        this.show(newType)
    }

    type = ''

    selective = {
        id: '',
        title: '',
        text: ''
    }

    constructor(public dialog: MatDialog, public uploadService: UploadService, private NewsService: NewsService, private ActivitiesService: ActivitiesService) { }

    private show(input: string) {

        console.log(input)

        for (var i = 0; i < this.categories.length; i++) {

            let type = this.categories[i].title

            if (type === input) {
                this.selective.id = this.categories[i].id
                this.selective.title = this.categories[i].title
                this.selective.text = this.categories[i].text
            }
        }
    }

    public uploadNewsDialog() {
        this.news.title = this.title
        let safetext = this.text
        this.news.text = `<p>${safetext}</p>`
        this.news.sign = this.sign
        this.news.rank = this.rank
        this.uploadService.getNews(this.news, this.newsUrl)
        let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' })
    }

    public updateSelectiveType() {
        let updated = {
            id: this.selective.id,
            title: this.catTitle,
            text: this.catText
        }
        this.uploadService.getNews(updated, this.selectiveUrl)
        let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' })
    }

    ngOnInit() {
        this.ActivitiesService.getSelective().subscribe(selective$ => {
            this.categories = JSON.parse(selective$)
        }, (err) => {
            console.error(err)
        })
    }

}