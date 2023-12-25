import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiModule } from './ui/ui.module';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule, UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config : {
        tokenGetter: ()=> localStorage.getItem("accessToken"),
        allowedDomains : ["localhost:7238"],
      }
    }),
    SocialLoginModule
  ],
  providers: [
    {provide:"baseUrl", useValue:"https://localhost:7238/api", multi:true},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("1030528661460-p9pmouk1vq9kef7023l59obti2ps1e1n.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }