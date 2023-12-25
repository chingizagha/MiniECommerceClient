import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) 
export class AppComponent {
  constructor(public authSerice : AuthService,
    private router:Router,
    private toastrSerice:CustomToastrService){
    authSerice.identityCheck();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authSerice.identityCheck();
    this.router.navigate(["login"]);

    this.toastrSerice.Message("You signed out","Signed out",{
      messageType : ToastrMessageType.Info,
      position : ToastrPosition.TopRight
  })

  }
}