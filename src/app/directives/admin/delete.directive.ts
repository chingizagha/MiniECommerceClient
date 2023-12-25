import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { __exportStar } from 'tslib';
import { HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponent,
   DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $ : any;
//Directive is using for our clear code and 
//to reduce the originality
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertify:AlertifyService,
    private dialogService:DialogService) { 
      const img = _renderer.createElement("img");
      img.setAttribute("src", "../../../../../assets/delete.png");
      img.setAttribute("style", "cursor: pointer;");
      img.width = 25;
      img.height = 25;
      _renderer.appendChild(element.nativeElement, img);    
    }
    @Output() callback : EventEmitter<any>=new EventEmitter()
    //@Input is using for to take the data from 
    //html input.
    @Input() id: string;
    @Input() controller:string;
    //This is used for to listen an event from html.
    @HostListener("click")
    async onclick(){
      this.openDialog(async ()=>{
        this.spinner.show(SpinnerType.ballSpinClockwiseFadeRotating);
        const td : HTMLTableCellElement= this.element.nativeElement;
        //await this.httpClientService.delete(this.id);
        this.httpClientService.delete({
          controller : this.controller
        }, this.id).subscribe(data=>{
            $(td.parentElement).animate({
              opacity: 0,
              left: "+=50",
              height: "toogle"
            }, 700, () => {
              this.callback.emit();
              this.spinner.hide(SpinnerType.ballSpinClockwiseFadeRotating);
              this.alertify.message("Product was deleted succesfully",{
                dismissOthers:true,
                position:Position.TopRight,
                messageType:MessageType.Success
              });
            })
          },
          (errorResponse:HttpErrorResponse)=>{
            this.spinner.hide(SpinnerType.ballSpinClockwiseFadeRotating);
            this.alertify.message("Something get wrong",{
              dismissOthers:true,
              position:Position.TopRight,
              messageType:MessageType.Error
            });
          });
        });
    }
    openDialog(afterClosed:any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data: DeleteState.Yes,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result==DeleteState.Yes){
         afterClosed();
        }
    });
  }
}
