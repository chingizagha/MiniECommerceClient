import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { ComponentsModule } from './components/components.module';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    MatSidenavModule
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
