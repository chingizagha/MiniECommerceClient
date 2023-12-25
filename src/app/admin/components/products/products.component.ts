import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Component, createComponent, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    createComponent;
  }


  //Takes the child element from product component
  //and use the method.
  @ViewChild(ListComponent) listComponents:ListComponent
  createdProduct(createdProduct : Create_Product){
    this.listComponents.getProducts();
  }
}