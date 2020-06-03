import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { WeightsService } from '../weights.service'
import { Subscription } from 'rxjs'
import { Title } from '@angular/platform-browser'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

import { registerLocaleData } from '@angular/common'
import localeHu from '@angular/common/locales/hu'
registerLocaleData(localeHu, 'hu')

@Component({
  selector: 'app-merleg',
  templateUrl: './merleg.component.html',
  styleUrls: ['./merleg.component.css']
})
export class MerlegComponent implements OnInit, AfterViewInit {

  @ViewChild('screen', { static: false }) canvas: ElementRef

  title = 'RDF Mérleg'
  subscription1: Subscription
  subscription2: Subscription
  subscription3: Subscription
  subscription4: Subscription
  day: string
  dateInput: string
  weight: number
  showToday = true
  todayWeights = []
  dateWeights = []
  audio = new Audio()
  audioPlayed = false
  state = 'on'
  copyright = faCopyright
  frame: string

  constructor(private WeightService: WeightsService, private Title: Title) {

  }

  setDocTitle(weight) {

    this.Title.setTitle(`Autó a mérlegen: ${weight} kg`)
    setTimeout(() => {
      this.Title.setTitle('RDF Mérleg')
    }, 1000)

  }

  speaker() {
    if (this.state === 'on') {
      this.state = 'off';
      this.audio.volume = 0
    } else {
      this.state = 'on'
      this.audio.volume = 0.3
    }
  }

  toggleToday() {
    this.showToday = !this.showToday
  }

  submit() {
    this.day = this.dateInput
    console.log(this.day)
    this.WeightService.updateByDate(this.day)
  }

  ngOnInit() {

    this.audio.src = "assets/horn.wav"
    this.audio.volume = 0.3
    this.audio.load()

    this.subscription1 = this.WeightService.getWeight().subscribe(weight$ => {
      this.weight = weight$
      if (weight$ > 500) {
        this.setDocTitle(weight$)
        if (!this.audioPlayed) {
          this.audio.play()
          this.audioPlayed = true
        }
      } else {
        this.audioPlayed = false
      }
    })

    this.subscription3 = this.WeightService.getTodayWeights().subscribe(todayWeights$ => {
      this.todayWeights = todayWeights$
    })

    this.subscription4 = this.WeightService.getDateWeights().subscribe(dateWeights$ => {
      this.dateWeights = dateWeights$
    })

  }

  ngAfterViewInit() {
    this.subscription2 = this.WeightService.getStream().subscribe(stream$ => {
      this.frame = `data:image/jpeg;base64,${stream$}`
    })
  }
}