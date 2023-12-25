import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openDialog(DialogParameters:Partial<DialogParameters>): void
  { 
    const dialogRef = this.dialog.open(DialogParameters.componentType,
    {
      width: DialogParameters.options?.width,
      height:DialogParameters.options?.height,
      position:DialogParameters.options?.position,
      data: DialogParameters.data,
    });
     
   dialogRef.afterClosed().subscribe(result => 
    {
      if (result == DialogParameters.data)
        DialogParameters.afterClosed();
    });
  }
}
export class DialogParameters{
  componentType:ComponentType<any>;
  afterClosed:()=> void;
  data: any;
  options?:Partial<DialogOptions>= new DialogOptions();
}
export class DialogOptions{
  width ?:string="250px";
  height?:string;
  position?:DialogPosition;
}