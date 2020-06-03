import { Component, OnInit } from '@angular/core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { faDumpster } from '@fortawesome/free-solid-svg-icons'
import { MatDialog } from '@angular/material/dialog'
import { IslandComponent} from './island/island.component'
import { CollectingComponent} from './collecting/collecting.component'
import { GameComponent } from './game/game.component'

import { ActivitiesService} from '../activities.service'

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent implements OnInit {
  
  menuItems = [
    {
      id: 'domestic',
      title: '',
      icon: faTrashAlt,
      show: true,
      text: '',
      pics: ''
    },
    {
      id: 'selective',
      title: '',
      icon: faRecycle,
      show: false,
      text: '',
      pics: [],
      subcomponents: [
        IslandComponent,
        CollectingComponent
      ],
      size: {
        width: '80%',
        height: '80%'
      }
    },
    {
      id: 'junkyard',
      title: '',
      icon: faDumpster,
      show: false,
      text: '',
      pics: []
    },
    {
      id: 'education',
      title: '',
      icon: faGlobeEurope,
      show: false,
      text: '',
      pics: [],
      subcomponents: [ 
        GameComponent
      ],
      size: {
        width: '100vw',
        height: '100vh'
      }
    }
  ]

  toggleMenu(i) {
    for (var c = 0; c < this.menuItems.length; c++) {
      this.menuItems[c].show = false;
    }
    this.menuItems[i].show = true;
  }

  openDialog(i, j) {
    const comp = this.menuItems[i].subcomponents[j]
    const dialogRef = this.dialog.open(comp as any, this.menuItems[i].size);
  }

  constructor(public dialog: MatDialog, private ActivitiesService: ActivitiesService) { }

  ngOnInit() {
    this.ActivitiesService.getActivities().subscribe(activities$ => {
      let activities = JSON.parse(activities$)
      for (var i = 0; i < activities.length; i++) {
        this.menuItems[i].title = activities[i].title
        this.menuItems[i].text = activities[i].text
        this.menuItems[i].pics = activities[i].pics
      }
    }, (err) => {
      console.error(err)
    })
  }

}
