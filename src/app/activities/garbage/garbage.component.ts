import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit {

  title: string
  text: string
  pic: string

  constructor(public dialogRef: MatDialogRef<GarbageComponent>, private renderer: Renderer2, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog() {
    this.dialogRef.close()
    this.renderer.removeClass(document.body, 'scrolloff')
  }

  ngOnInit(): void {
    this.title = this.data.title
    this.text = this.data.text
    this.pic = this.data.pic
  }

}
