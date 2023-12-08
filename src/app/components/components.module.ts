import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports: [
    HomeComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
