import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu, 'hu')

import { DataService } from '../data.service'

export interface day {
  week: number,
  day: number,
  date: number,
  show: boolean,
  today: boolean,
  holiday: string,
  colors: string[]
}

export interface Street {
  street: string,
  area: string,
  single: number,
  multi: number[],
  yellow: number,
  blue: number,
  green: number
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar') calendar: ElementRef
  @ViewChild('cityInput') cityInput: FormControl
  @ViewChild('typeInput') typeInput: FormControl
  @ViewChild('streetInput') streetInput: FormControl

  dayNames = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']

  colors = [
    {
      color: 'mixed',
      label: 'kommunális',
      show: false
    },
    {
      color: 'yellow',
      label: 'műanyag és fém',
      show: false
    },
    {
      color: 'blue',
      label: 'papír',
      show: false
    },
    {
      color: 'green',
      label: 'zöldhulladék',
      show: false
    }
  ]

  days: day[] = []

  right = faArrowCircleRight
  left = faArrowCircleLeft
  arrowSize: number = 0
  arrowY: number = 0
  arrowLeftX: number = 0
  arrowRightX: number = 0
  showArrow: boolean = false

  blockSize = {
    width: 0,
    height: 0,
    numSize: 0,
    holidaySize: 0,
    margin: 0
  }

  today = new Date()
  yearOfToday = this.today.getFullYear()
  monthOfToday = this.today.getMonth()
  dayOfToday = this.today.getDate()
  dateToShow: Date
  lastWeek: number
  lastDateOfMonth: number

  holidays = []

  cities: string[] = ['Zalaegerszeg', 'Zalacséb']
  types: string[] = ['társasház', 'családi ház']
  streets: Street[]
  garbages: string[] = []

  selectedCity: string
  selectedType: string
  streetSelection: Street

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.setSize();
  }

  @Input() set selectedCityName(name: string) {
    this.selectedCity = name
    if (name !== 'Zalaegerszeg') {
      this.typeInput.reset()
      this.selectedType = undefined
      this.selectedStreet = undefined
    }
  }

  @Input() set selectedTypeName(type: string) {
    this.selectedType = type
    this.streetSelection = undefined
    this.streets = []
    if (type === 'családi ház') {
      this.DataService.getCalZegSingle().subscribe(calZeg$ => {
        this.streets = calZeg$
      }, (err) => {
        console.error(err)
      })
    } else if (type === 'társasház') {
      this.DataService.getCalZegMulti().subscribe(calZeg$ => {
        this.streets = calZeg$
      }, (err) => {
        console.error(err)
      })
    }
    if (this.streetInput) {
      this.streetInput.reset()
    }
    this.days.map(d => d.colors = [])

  }

  @Input() set selectedStreet(name: string) {
    if (name) {
      const selectedStreet: Street = this.streets.filter(s => s.street === name)[0]
      this.streetSelection = selectedStreet
      this.fillCal(selectedStreet)
    }
  }

  constructor(private DataService: DataService) {
  }

  prevMonth() {
    const
      year = this.dateToShow.getFullYear(),
      month = this.dateToShow.getMonth()

    this.dateToShow = new Date(year, month - 1, 1)
    this.setCalendar()
    if (this.streetSelection) {
      this.fillCal(this.streetSelection)
    }
  }

  nextMonth() {
    const
      year = this.dateToShow.getFullYear(),
      month = this.dateToShow.getMonth()

    this.dateToShow = new Date(year, month + 1, 1)
    this.setCalendar()
    if (this.streetSelection) {
      this.fillCal(this.streetSelection)
    }
  }

  colorChecked() {
    if (this.streetSelection)
    this.fillCal(this.streetSelection)
  }

  setHolidays(year: number) {
    this.holidays = []

    let
      M = 24,
      N: number

    if (year < 2100) {
      N = 5
    } else {
      N = 6
    }

    let
      a = year % 19,
      b = year % 4,
      c = year % 7,
      d = ((19 * a) + M) % 30,
      e = ((2 * b) + (4 * c) + (6 * d) + N) % 7,
      easterMonth: number,
      easterSun: number

    if ((d + e) < 10) {
      easterMonth = 2
      easterSun = d + e + 22
    } else {
      easterMonth = 3
      easterSun = d + e - 9
    }

    let
      easterMonMonth = new Date(year, easterMonth, easterSun + 1).getMonth(),
      easterMonDay = new Date(year, easterMonth, easterSun + 1).getDate(),
      easterFriMonth = new Date(year, easterMonth, easterSun - 2).getMonth(),
      easterFriDay = new Date(year, easterMonth, easterSun - 2).getDate(),
      pentSunMonth = new Date(year, easterMonth, easterSun + 49).getMonth(),
      pentSunDay = new Date(year, easterMonth, easterSun + 49).getDate(),
      pentMonMonth = new Date(year, easterMonth, easterSun + 50).getMonth(),
      pentMonDay = new Date(year, easterMonth, easterSun + 50).getDate()

    this.holidays.push(
      {
        month: easterMonth,
        day: easterSun,
        name: 'Húsvét'
      },
      {
        month: easterMonMonth,
        day: easterMonDay,
        name: 'Húsvét'
      },
      {
        month: easterFriMonth,
        day: easterFriDay,
        name: 'Nagypéntek'
      },
      {
        month: pentSunMonth,
        day: pentSunDay,
        name: 'Pünkösd'
      },
      {
        month: pentMonMonth,
        day: pentMonDay,
        name: 'Pünkösd'
      },
      {
        month: 0,
        day: 1,
        name: 'Újév'
      },
      {
        month: 2,
        day: 15,
        name: '1948-as forradalom'
      },
      {
        month: 4,
        day: 1,
        name: 'A munka ünnepe'
      },
      {
        month: 7,
        day: 20,
        name: 'Államalapítás'
      },
      {
        month: 9,
        day: 23,
        name: '1956-os forradalom'
      },
      {
        month: 10,
        day: 1,
        name: 'Mindenszentek'
      },
      {
        month: 11,
        day: 25,
        name: 'Karácsony'
      },
      {
        month: 11,
        day: 26,
        name: 'Karácsony'
      }
    )
  }

  setCalendar() {
    this.days = []

    const
      year = this.dateToShow.getFullYear(),
      month = this.dateToShow.getMonth(),
      firstDay = new Date(year, month, 1),
      offset = firstDay.getDay() - 1

    this.setHolidays(year)
    this.lastDateOfMonth = new Date(year, month + 1, 0).getDate()

    for (let w = 1; w < 7; w++) {
      for (let d = 1; d < 8; d++) {

        let dayOfMonth = (w * 7) - 7 + d - offset,
          toShow: boolean,
          today: boolean,
          holiday: string

        if (dayOfMonth < 1 || dayOfMonth > this.lastDateOfMonth) {
          toShow = false
        } else {
          toShow = true
        }

        if (this.dayOfToday === dayOfMonth && this.monthOfToday === month && this.yearOfToday === year) {
          today = true
        } else {
          today = false
        }

        if (d === 7) {
          holiday = 'vasárnap'
        }

        for (var i = 0; i < this.holidays.length; i++) {
          if (this.holidays[i].month === month && this.holidays[i].day === dayOfMonth) {
            holiday = this.holidays[i].name
            break
          }
        }

        this.days.push({
          week: w,
          day: d,
          date: dayOfMonth,
          show: toShow,
          today: today,
          holiday: holiday,
          colors: []
        })
      }
    }
    this.lastWeek = this.days[this.lastDateOfMonth - 1].week
  }

  fillCal(street: Street) {
    this.days.forEach(d => {
      d.colors = []
      if (this.selectedType === 'családi ház') {
        if (street.single === d.day && this.colors[0].show) {
          d.colors.push('mixed')
        }
        if (street.yellow === d.day && d.date + 7 > this.lastDateOfMonth && this.colors[1].show) {

          d.colors.push('yellow')
        }
        if (street.blue === d.day && d.date + 7 > this.lastDateOfMonth && this.colors[2].show) {
          d.colors.push('blue')
        }
        if (street.green === d.day && d.date + 7 > this.lastDateOfMonth && this.colors[3].show) {
          d.colors.push('green')
        }
      } else {
        if (street.multi.includes(d.day) && this.colors[0].show) {
          d.colors.push('mixed')
        }
        if (street.yellow === d.day && this.colors[1].show) {
          d.colors.push('yellow')
        }
        if (street.blue === d.day && this.colors[2].show) {
          d.colors.push('blue')
        }
        if (street.green === d.day && this.colors[3].show) {
          d.colors.push('green')
        }
      }

    })
  }

  setSize() {
    const
      calTop = this.calendar.nativeElement.offsetTop,
      calLeft = this.calendar.nativeElement.offsetLeft,
      calHeight = this.calendar.nativeElement.offsetHeight,
      calWidth = this.calendar.nativeElement.offsetWidth

    if (calLeft > 70) {
      this.arrowSize = 50
    } else {
      this.arrowSize = calLeft - 20
    }
    this.arrowY = calTop + (calHeight / 2) - (this.arrowSize / 2)
    this.arrowLeftX = calLeft - this.arrowSize - 10
    this.arrowRightX = calLeft + calWidth + 10
    this.blockSize.height = (calHeight / 7) - 20
    this.blockSize.width = (calWidth / 7) - 20
    this.blockSize.numSize = this.blockSize.height * .36
    this.blockSize.holidaySize = this.blockSize.height * .18
    this.blockSize.margin = this.blockSize.height * .02
  }

  ngAfterViewInit(): void {
    this.setSize()
    this.showArrow = true
  }


  ngOnInit(): void {
    this.dateToShow = new Date(this.yearOfToday, this.monthOfToday, this.dayOfToday)
    this.setCalendar()
  }

}
