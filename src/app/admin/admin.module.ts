import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule
  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }
