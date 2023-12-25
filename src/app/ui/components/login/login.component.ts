import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/model/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService,
    spinner:NgxSpinnerService,
    private authService:AuthService,
    private socialAuthService: SocialAuthService,
    private actiatedRoute:ActivatedRoute,
    private router:Router) {
    super(spinner);
    
    this.socialAuthService.authState.subscribe(async(user: SocialUser) => {
      await userService.googleLogin(user,
        ()=>{ this.hideSpinner(SpinnerType.BallAtom)
          this.authService.identityCheck;
        });
    });
  }

  ngOnInit(): void {
  }
  async login(UsernameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(UsernameOrEmail,password,()=>{
      this.authService.identityCheck();
      
      this.actiatedRoute.queryParams.subscribe(params=>{
        const returnUrl:string= params["returnUrl"];
        if(returnUrl){
          this.router.navigate([returnUrl]);
        }
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });
  }
}