import { DialogRef, throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
  public files: NgxFileDropEntry[];
  constructor(
    private httpClientService:HttpClientService,
    private alertifyService:AlertifyService,
    private toastrService:CustomToastrService,
    private matDialog : MatDialog,
    private dialogService:DialogService,
    private spinner : NgxSpinnerService) {}
    
    
    
    @Input() options : Partial<FileUploadOptions>
    dialog : any;
    
    public selectedFiles(files: NgxFileDropEntry[]) {
      this.files = files;
      const fileData:FormData=new FormData();
      for(const file of files){
        (file.fileEntry as FileSystemFileEntry).file((_file: File)=>{
        fileData.append(_file.name,_file,file.relativePath);
      });
    }
    
    //Exception is here
    // this.openDialog(()=>{
      // this.dialogService.openDialog({
      //   componentType: FileUploadComponent,
      //   data:FileUploadDialogState.Yes,
      //   afterClosed: ()=>{
          this.spinner.show(SpinnerType.BallScaleMultiple);
          this.httpClientService.post({
            controller:this.options.controller,
            action:this.options.action,
            queryString : this.options.queryString,
            headers: new HttpHeaders({ "responseType": "blob" })
        },fileData).subscribe(data=>
        {
          //Body
          const Message="Files added successfully";
          if(this.options.isAdminPage){
            this.alertifyService.message(Message,{
              dismissOthers:false,
              position:Position.TopRight,
              messageType:MessageType.Success});
          }
          else{
            this.toastrService.Message
            (Message,"Succeed",
            {
              messageType:ToastrMessageType.Success,
              position:ToastrPosition.TopRight
            })
    
          }
          this.spinner.hide(SpinnerType.BallScaleMultiple);
          },(errorResponse:HttpErrorResponse)=>{
            const errorMessage="Something get wrong when the files were uploading";
            if(this.options.isAdminPage){
              this.alertifyService.message(errorMessage,{
                  dismissOthers:false,
                  position:Position.TopRight,
                  messageType:MessageType.Error});
            }
            else{
              this.toastrService.Message
              (errorMessage,"Failed",{
                messageType:ToastrMessageType.Error,
                position:ToastrPosition.TopRight
              })
            }
          }); 
        }}
    //);
  //}
//}
export class FileUploadOptions{
  
  isAdminPage?:boolean=false;
  explanation?:string;
  queryString?:string;
  controller?:string;
  action?:string;
  accept?:string;
}