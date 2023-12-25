import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/model/product.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { Component,  Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  
  constructor(
    spinner:NgxSpinnerService,
     private productService:ProductService,
     private alertify:AlertifyService) {
    super(spinner)
   }
  


  
  @Output() createdProduct: EventEmitter<Create_Product>=new EventEmitter();
  //ErrorMessage checks the errors from backend
  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const create_product:Create_Product=new Create_Product();
    create_product.name=name.value;
    create_product.stock=parseInt(stock.value);
    create_product.price=parseFloat(price.value);

    this.productService.createProduct(create_product,()=>
    {this.hideSpinner(SpinnerType.BallAtom),
    this.alertify.message("Your product successfully added",{
      dismissOthers:true,
      messageType:MessageType.Success,
      position:Position.TopLeft
    });
    this.createdProduct.emit(create_product);
  },
    errorMessage=>{
      this.alertify.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    });
  }
}