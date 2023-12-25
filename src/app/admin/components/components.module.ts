import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomerModule } from './customer/customer.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    OrdersModule,
    DashboardModule,
    ProductsModule,
    CustomerModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class ComponentsModule { }