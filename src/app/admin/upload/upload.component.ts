import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

    edited = 'menu-intro'

    menuitems = [
        {
            id: 'menu-intro',
            label: 'Bemutatkozás',            
        },
        {
            id: 'menu-news',
            label: 'Hírek'
        },
        {
            id: 'menu-industrial',
            label: 'Gazdálkodói gyűjtés'
        },
        {
            id: 'menu-domestic',
            label: 'Lakossági gyűjtés'
        },
        {
            id: 'menu-selective',
            label: 'Szelektív gyűjtés'
        },
        {
            id: 'menu-junkyard',
            label: 'Hulladékudvar'
        },
        {
            id: 'menu-education',
            label: 'Környezeti nevelés'
        },
        {
            id: 'menu-media',
            label: 'Médiamegjelenés'
        },
        {
            id: 'menu-contact',
            label: 'Kapcsolat'
        },
        {
            id: 'menu-career',
            label: 'Karrier'
        },
        {
            id: 'menu-pub-data',
            label: 'Közédekű'
        },
        {
            id: 'menu-customers',
            label: 'Ügyfélszolgálat'
        },
        {
            id: 'menu-legislation',
            label: 'Jogszabályok'
        },
        {
            id: 'menu-authorities',
            label: 'Felügyeleti szervek'
        },
        {
            id: 'menu-permits',
            label: 'Engedélyek'
        }
    ]

    constructor(private renderer: Renderer2) { }

    toggle(id) {
        this.edited = id
    }

    

    ngOnInit() {
        
    }

}