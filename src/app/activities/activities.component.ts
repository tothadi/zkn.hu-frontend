import { Component, OnInit, Renderer2 } from '@angular/core'
import { faDumpster, faGlobeEurope, faIndustry, faRecycle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { MatDialog } from '@angular/material/dialog'
import { GarbageComponent } from './garbage/garbage.component'
import { TrashfinderComponent } from './trashfinder/trashfinder.component'

import { DataService } from '../data.service'

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent implements OnInit {

  menuItems = [
    {
      id: 'business',
      title: '',
      icon: faIndustry,
      show: true,
      text: ''
    },
    {
      id: 'domestic',
      title: '',
      icon: faRecycle,
      show: false,
      text: '',
      subcomponents: [

      ]
    },
    {
      id: 'junkyard',
      title: '',
      icon: faDumpster,
      show: false,
      text: '',
    },
    {
      id: 'education',
      title: '',
      icon: faGlobeEurope,
      show: false,
      text: '',
      subcomponents: [

      ]
    }
  ]

  trashfinder = TrashfinderComponent

  toggleMenu(i) {
    for (var c = 0; c < this.menuItems.length; c++) {
      this.menuItems[c].show = false;
    }
    this.menuItems[i].show = true;
  }

  openDialog(i, j) {
    const data = this.menuItems[i].subcomponents[j]
    let options: any
    let comp: any

    if (data.type === 'info') {
      options = {
        id: 'garbage',
        panelClass: 'overl',
        maxWidth: '1400px',
        width: '100vw',
        height: '100vh',
        data: {
          title: data.title,
          text: data.text,
          pic: data.pic
        }
      }
      comp = GarbageComponent
    } else if (data.type === 'game') {
      options = {
        id: data.id,
        panelClass: 'overl',
        maxWidth: '100vw',
        width: '100vw',
        height: '100vh',
      }
      const compName = data.id.replace('-', '')
      comp = eval(`this.${compName}`)
    }

    console.log()

    const dialogRef = this.dialog.open(comp as any, options)

    this.renderer.addClass(document.body, 'scrolloff')
  }

  constructor(public dialog: MatDialog, private ActivitiesService: DataService, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.ActivitiesService.getActivities().subscribe(activities$ => {
      let activities = JSON.parse(activities$)
      for (var i = 0; i < activities.length; i++) {
        this.menuItems[i].title = activities[i].title
        this.menuItems[i].text = activities[i].text
        this.menuItems[i].subcomponents = activities[i].subs
      }
    }, (err) => {
      console.error(err)
    })

  }

}
