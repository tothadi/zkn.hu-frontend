import { Component, OnInit, Input, HostListener, Renderer2 } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog';
import * as uniqueRandom from 'unique-random-at-depth'
import * as $ from 'jquery'
import { SimpleTimer } from 'ng2-simple-timer'
import { ResultService, Result, User } from '../../result.service'

@Component({
  selector: 'app-trashfinder',
  templateUrl: './trashfinder.component.html',
  styleUrls: ['./trashfinder.component.css']
})

export class TrashfinderComponent implements OnInit {

  public innerWidth: number;
  public innerHeight: number;

  selectedName: string
  found = false
  noSave = false
  saving = false
  saved: boolean
  message: string

  trashBins = [
    {
      src: 0,
      alt: 0
    },
    {
      src: 0,
      alt: 0
    },
    {
      src: 0,
      alt: 0
    },
    {
      src: 0,
      alt: 0
    }
  ]
  glass = 0
  metal = 0
  plast = 0
  paper = 0
  pictures = []
  size = 24
  randomBins = uniqueRandom(1, 4, 4)
  randomGlass = uniqueRandom(1, 10, 6)
  randomMetal = uniqueRandom(1, 117, 6)
  randomPaper = uniqueRandom(1, 10, 6)
  randomPlast = uniqueRandom(1, 10, 6)
  firstPicId = 0
  secondPicId = 0
  showFirst = false
  firstClick = true
  gameEnded = false
  matchCount = 0
  time
  timeInMs: number
  points: number

  CounterMs = 0
  milliseconds = 0
  timerMsId: string
  timerMsName: string = '1 ms'

  CounterSec = 0
  seconds = '00'

  CounterMin = 0
  minutes = '00'

  CounterHour = 0
  hours = '00'

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.innerWidth = event.target.innerWidth;
    this.innerHeight = event.target.innerHeight;
    this.setOptions();
  }

  constructor(public dialogRef: MatDialogRef<TrashfinderComponent>, private timer: SimpleTimer, private Result: ResultService, private renderer: Renderer2) {

  }

  setOptions() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  closeDialog() {
    this.dialogRef.close()
    this.renderer.removeClass(document.body, 'scrolloff')
  }

  secondPic() {
    let first = this.firstPicId
    let second = this.secondPicId
    if (first === second) {
      this.matchCount++
      if (this.matchCount === 24) {
        this.unSubscribeTimers()
        this.time = this.hours + ':' + this.minutes + ':' + this.seconds + '.' + this.milliseconds.toString()
        this.timeInMs = (parseInt(this.hours) * 3600000) + (parseInt(this.minutes) * 60000) + (parseInt(this.seconds) * 1000) + (this.milliseconds * 10)
        setTimeout(() => {
          this.delAllTimers()
          this.gameEnded = true
          //send to backend
        }, 2000)
      }
      this.showFirst = false
      $('.first').addClass('last-two')
      $('.second').addClass('last-two')
      setTimeout(() => {
        $('.first').removeClass('last-two')
        $('.second').removeClass('last-two')
        if (second === 1) {
          this.glass++
          if (this.glass < 6) {
            $('.second').find('img').css('opacity', '0')
            $('.second').removeClass('shown')
          }
        }
        if (second === 2) {
          this.metal++
          if (this.metal < 6) {
            $('.second').find('img').css('opacity', '0')
            $('.second').removeClass('shown')
          }
        }
        if (second === 3) {
          this.paper++
          if (this.paper < 6) {
            $('.second').find('img').css('opacity', '0')
            $('.second').removeClass('shown')
          }
        }
        if (second === 4) {
          this.plast++
          if (this.plast < 6) {
            $('.second').find('img').css('opacity', '0')
            $('.second').removeClass('shown')
          }
        }
        $('.first').removeClass('first')
        $('.second').removeClass('second')
      }, 1000)
    } else {
      this.showFirst = false
      setTimeout(() => {
        $('.first').find('img').css('opacity', '0')
        $('.second').find('img').css('opacity', '0')
        $('.first').removeClass('shown')
        $('.second').removeClass('shown')
        $('.first').removeClass('first')
        $('.second').removeClass('second')
      }, 1000)
    }
  }

  showPic(event) {
    if (this.firstClick) {
      this.subscribeTimers()
      this.firstClick = false
    }
    var target = event.target;
    var fraction = parseInt(target.alt.substr(0, 1))
    console.log(fraction)

    if (!this.showFirst) {
      this.firstPicId = fraction
      this.showFirst = true
      $(target).parent().addClass('first shown')
      $(target).css('opacity', '1')
    } else {
      this.secondPicId = fraction
      $(target).parent().addClass('second shown')
      $(target).css('opacity', '1')
      $('#pictures').css('pointer-events', 'none')
      setTimeout(() => {
        $('#pictures').css('pointer-events', 'initial')
      }, 1000)
      this.secondPic()
    }
  }

  @Input() set sign(user: string) {

    this.selectedName = user
    let newUser: User = { username: user }

    this.Result.checkName(newUser).subscribe(res => {
      this.found = res.found
    })
  }

  uploadResult() {
    if (this.noSave) {
      this.dialogRef.close()
    } else {
      let resultBlock: Result = { username: this.selectedName, time: this.timeInMs, date: new Date() }
      console.log(resultBlock)
      this.Result.addResult(resultBlock).subscribe(res => {
        this.saving = true
        if (res.saved) {
          this.saved = true
          this.message = 'Sikeres mentés'
        } else {
          this.saved = false
          this.message = 'A mentés sikertelen'
        }
        setTimeout(() => {
          this.dialogRef.close()
        }, 1000);
      })
    }
  }

  subscribeTimers() {
    this.subscribeTimerMs()
  }

  unSubscribeTimers() {
    this.timer.unsubscribe(this.timerMsId)
  }

  delAllTimers() {
    this.timer.delTimer(this.timerMsName)
    this.milliseconds = 0
    this.seconds = '00'
    this.minutes = '00'
    this.hours = '00'
  }

  subscribeTimerMs() {
    if (this.timerMsId) {
      // Unsubscribe if timer Id is defined
      this.timer.unsubscribe(this.timerMsId)
      this.timerMsId = undefined
    } else {
      // Subscribe if timer Id is undefined
      this.timerMsId = this.timer.subscribe(this.timerMsName, () => this.timerMsCallback())
    }
  }

  timerMsCallback(): void {
    this.CounterMs++
    if (this.CounterMs === 100) {
      this.CounterMs = 0
      this.CounterSec++
    }
    if (this.CounterSec === 60) {
      this.CounterSec = 0
      this.CounterMin++
    }
    if (this.CounterMin === 60) {
      this.CounterMin = 0
      this.CounterHour++
    }
    if (this.CounterSec === 60) {
      this.CounterSec = 0
      this.CounterSec++
    }

    this.milliseconds = this.CounterMs

    if (this.CounterSec < 10)
      this.seconds = '0' + this.CounterSec
    else
      this.seconds = this.CounterSec.toString()

    if (this.CounterMin < 10)
      this.minutes = '0' + this.CounterMin
    else
      this.minutes = this.CounterMin.toString()

    if (this.CounterHour < 10)
      this.hours = '0' + this.CounterHour
    else
      this.hours = this.CounterHour.toString()

  }

  shuffleArray(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  ngOnInit() {

    this.setOptions();

    this.timer.newTimerHR(this.timerMsName, 10, 10)

    for (var i = 0; i < 4; i++) {
      this.trashBins[i].src = this.randomBins()
      if (this.trashBins[i].src === 1) {
        this.trashBins[i].alt = 1
      } else if (this.trashBins[i].src === 2) {
        this.trashBins[i].alt = 2
      } else if (this.trashBins[i].src === 3) {
        this.trashBins[i].alt = 3
      } else {
        this.trashBins[i].alt = 4
      }
    }

    for (var i = 1; i <= 6; i++) {
      this.pictures.push(`4${this.randomPlast()}`)
    }
    for (var i = 1; i <= 6; i++) {
      this.pictures.push(`3${this.randomPaper()}`)
    }
    for (var i = 1; i <= 6; i++) {
      this.pictures.push(`2${this.randomMetal()}`)
    }
    for (var i = 1; i <= 6; i++) {
      this.pictures.push(`1${this.randomGlass()}`)
    }
    this.shuffleArray(this.pictures)
  }

}

