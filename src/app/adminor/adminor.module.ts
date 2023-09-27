import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminorComponent } from './adminor.component';
import { AdminorRoutingModule } from './adminor-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AdminorComponent
  ],
  imports: [
    CommonModule,
    AdminorRoutingModule,
    RouterModule,
    BrowserModule
  ]
})
export class AdminorModule { }
