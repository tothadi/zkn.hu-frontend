import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { UploadModule } from './admin/upload/upload.module'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgxPaginationModule } from 'ngx-pagination'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { FooterComponent } from './footer/footer.component'
import { MenuComponent } from './menu/menu.component'
import { NewsComponent } from './news/news.component'
import { ActivitiesComponent } from './activities/activities.component'
import { MediaComponent } from './media/media.component'
import { ContactComponent } from './contact/contact.component'
import { CareerComponent } from './career/career.component'
import { PubDataComponent } from './pub-data/pub-data.component'
import { CustomerServiceComponent } from './customer-service/customer-service.component'
import { LegalComponent } from './legal/legal.component'
import { AuthoritiesComponent } from './authorities/authorities.component'
import { PermitsComponent } from './permits/permits.component'
import { ArchivesComponent } from './archives/archives.component'
import { AdminComponent } from './admin/admin.component'
import { CalendarComponent } from './calendar/calendar.component';
import { GarbageComponent } from './activities/garbage/garbage.component'
import { TrashfinderComponent } from './activities/trashfinder/trashfinder.component'

import { ResultService } from './result.service';
import { DataService } from './data.service';
import { FullmenuComponent } from './menu/fullmenu/fullmenu.component';
import { SmallmenuComponent } from './menu/smallmenu/smallmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    MenuComponent,
    NewsComponent,
    ActivitiesComponent,
    MediaComponent,
    ContactComponent,
    CareerComponent,
    PubDataComponent,
    CustomerServiceComponent,
    LegalComponent,
    AuthoritiesComponent,
    PermitsComponent,
    ArchivesComponent,
    AdminComponent,
    CalendarComponent,
    GarbageComponent,
    TrashfinderComponent,
    FullmenuComponent,
    SmallmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UploadModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    NgxPaginationModule,
    FontAwesomeModule,
  ],
  providers: [
    ResultService,
    DataService
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
