import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivitiesService } from '../../activities.service';

@Component({
  selector: 'app-collecting',
  templateUrl: './collecting.component.html',
  styleUrls: ['./collecting.component.css']
})
export class CollectingComponent implements OnInit, AfterViewInit {

  @ViewChild('cat') cat: ElementRef;

  oneClicked = false;

  categories = []

  toggle(i) {
    for (let c = 0; c < this.categories.length; c++) {
      this.categories[c].clicked = false
    }
    this.categories[i].clicked = !this.categories[i].clicked
    this.oneClicked = true
  }

  scroll(el: HTMLElement) {
    this.cat.nativeElement.scrollIntoView({behavior: "auto", block: "start"})
    el.scrollIntoView({behavior: "smooth", block: "start"})
  }

  close() {
    for (let c = 0; c < this.categories.length; c++) {
      this.categories[c].clicked = false
    }
    this.cat.nativeElement.firstChild.scrollIntoView({behavior: "smooth", block: "start"})
    this.oneClicked = false;
  }

  constructor(public dialogRef: MatDialogRef<CollectingComponent>, private ActivitiesService: ActivitiesService) { }

  closeDialog() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    this.ActivitiesService.getSelective().subscribe(selective$ => {
      this.categories = JSON.parse(selective$)
    }, (err) => {
      console.error(err)
    })
  }

  ngAfterViewInit(): void {

  }

}
