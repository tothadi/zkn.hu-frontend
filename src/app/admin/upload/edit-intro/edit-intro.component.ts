import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { DataService } from '../../../data.service'

@Component({
  selector: 'app-edit-intro',
  templateUrl: './edit-intro.component.html',
  styleUrls: ['./edit-intro.component.css']
})
export class EditIntroComponent implements OnInit {

  text: string
  date: Date
  sign: string
  rank: string

  saving = false
  saved: boolean
  message: string

  constructor(public uploadService: UploadService, private introService: DataService) { }

  public updateIntro() {
    let updated = {
      text: this.text,
      sign: this.sign,
      rank: this.rank
    }
    this.uploadService.updateIntro(updated).subscribe(res => {
      this.saving = true
      if (res.saved) {
        this.saved = true
        this.message = 'Sikeres mentés'
      } else {
        this.saved = false
        this.message = 'A mentés sikertelen'
      }
      console.log(this.message)
    })
  }

  ngOnInit(): void {
    this.introService.getIntro().subscribe(intro$ => {
      const intro = JSON.parse(intro$)
      this.text = intro[0].text
      this.date = intro[0].date
      this.sign = intro[0].sign
      this.rank = intro[0].rank
    }, (err) => {
      console.error(err)
    })
  }

}
