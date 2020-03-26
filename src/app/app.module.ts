import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { NewsComponent } from './news/news.component';
import { PublicServiceComponent } from './public-service/public-service.component';
import { ActivitiesComponent } from './activities/activities.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MediaComponent } from './media/media.component';
import { ContactComponent } from './contact/contact.component';
import { CareerComponent } from './career/career.component';
import { PubDataComponent } from './pub-data/pub-data.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { LegalComponent } from './legal/legal.component';
import { AuthoritiesComponent } from './authorities/authorities.component';
import { PermitsComponent } from './permits/permits.component';
import { ArchivesComponent } from './archives/archives.component';

import { NewsService } from './news.service';
import { AdminComponent } from './admin/admin.component';
import { DialogComponent } from './admin/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    MenuComponent,
    NewsComponent,
    PublicServiceComponent,
    ActivitiesComponent,
    GalleryComponent,
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
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogComponent],
  providers: [
    NewsService
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
