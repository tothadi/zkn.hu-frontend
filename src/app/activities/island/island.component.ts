import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivitiesService } from '../../activities.service';

@Component({
  selector: 'app-island',
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.css']
})
export class IslandComponent implements OnInit {

  islands = []

  constructor(public dialogRef: MatDialogRef<IslandComponent>, private ActivitiesService: ActivitiesService) { }

  closeDialog() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    this.ActivitiesService.getIsland().subscribe(island$ => {
      this.islands = JSON.parse(island$)
    }, (err) => {
      console.error(err)
    })
  }

}
