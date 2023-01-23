import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material/material.module';
import { LayoutComponent } from '../layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListCharapterComponent } from './dashboard/components/list-charapter/list-charapter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PagesComponent,
    LayoutComponent,
    DashboardComponent,
    ListCharapterComponent,
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class PagesModule { }
