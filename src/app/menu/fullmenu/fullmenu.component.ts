import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-fullmenu',
  templateUrl: './fullmenu.component.html',
  styleUrls: ['./fullmenu.component.css']
})
export class FullmenuComponent implements OnInit, AfterViewInit {

  @ViewChild('breaking') breaking: ElementRef;
  @ViewChild('bar') bar: ElementRef;

  posX: number
  posY: number
  width: number

  arrowSize: number
  arrowY: number
  arrowLeftX: number
  arrowRightX: number

  right = faArrowCircleRight
  left = faArrowCircleLeft

  slides = ['dia1', 'dia2', 'dia3', 'dia4']

  progress: number = 0
  percentage: number = 0

  showBar = false
  slide

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.setPos();
  }

  constructor() { }

  setPos() {
    const
      picTop = this.breaking.nativeElement.children[0].children[0].offsetTop,
      picLeft = this.breaking.nativeElement.children[0].children[0].offsetLeft,
      picHeight = this.breaking.nativeElement.children[0].children[0].offsetHeight,
      picWidth = this.breaking.nativeElement.children[0].children[0].width

    this.posY = picTop + picHeight - 9
    this.posX = picLeft + 3
    this.width = picWidth - 6

    if (picLeft > 70) {
      this.arrowSize = 50
    } else {
      this.arrowSize = picLeft - 20
    }
    this.arrowY = picTop + (picHeight / 2) - (this.arrowSize / 2)
    this.arrowLeftX = picLeft - this.arrowSize - 10
    this.arrowRightX = picLeft + picWidth + 10
  }

  toLeft() {
    this.slides.unshift(this.slides.pop())
    this.progress = 0
    this.percentage = 0
  }

  toRight() {
    this.slides.push(this.slides.shift())
    this.progress = 0
    this.percentage = 0
  }

  stopSlide() {
      clearInterval(this.slide)
  }

  startSlide() {
    this.slide = setInterval(() => {
      this.progress += 2
      if (this.progress > 100) {
        this.progress = 0
        this.percentage = 0
        this.slides.push(this.slides.shift())

      } else {
        setTimeout(() => {
          this.percentage = this.progress
        }, 100)
      }
    }, 100)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showBar = true;
      this.setPos()
      this.startSlide()
    }, 1000); 
  }

  ngOnInit(): void {
  }

}
