import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import  {CreateComponent}  from './create/create.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {ProductsComponent} from './products.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {ListComponent}  from './list/list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from 'src/app/dialogs/dialog.module';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
    DeleteDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ProductsComponent }
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FileUploadModule
  ]
})
export class ProductsModule { }
