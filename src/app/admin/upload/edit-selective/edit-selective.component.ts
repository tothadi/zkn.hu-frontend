import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UploadService } from '../upload.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-edit-selective',
  templateUrl: './edit-selective.component.html',
  styleUrls: ['./edit-selective.component.css']
})
export class EditSelectiveComponent implements OnInit {

  catTitle: string
  catText: string

  selectiveUrl = '/api/selectiveupdate'

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

  constructor(public dialog: MatDialog, public uploadService: UploadService, private ActivitiesService: DataService) { }

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

  public updateSelectiveType() {
    let updated = {
      id: this.selective.id,
      title: this.catTitle,
      text: this.catText
    }
    this.uploadService.getData(updated, this.selectiveUrl)
    let dialogRef = this.dialog.open(DialogComponent, {
      id: 'update-selective',
      panelClass: 'overl',
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh'
    })
  }

  ngOnInit(): void {
    this.ActivitiesService.getSelective().subscribe(selective$ => {
      this.categories = JSON.parse(selective$)
    }, (err) => {
      console.error(err)
    })
  }

}
