import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Create_User } from 'src/app/contracts/users/createUser';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclientservice:HttpClientService,private toastrService:CustomToastrService) { }



  async create(user:User):Promise<Create_User>{
    const observable:Observable<Create_User | User> =  this.httpclientservice.post<Create_User | User>({
      controller:"auth"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail,password,callBackFunction?:()=>void) {
    const observable : Observable<any | TokenResponse> =
    this.httpclientservice.post<any | TokenResponse>({
        controller:"auth",
        action:"login"
    }, { usernameOrEmail,password })
    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      const data=tokenResponse.token;
      console.log(data);
      console.log(data.accessToken);
      
      //Writing the data to localStorage of browser :       
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      this.toastrService.Message("Success","You entered successfully",
      {
        messageType:ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    callBackFunction();
  }

  async googleLogin(user : SocialUser, callBackFunction?:()=>void) :Promise<any> 
  {
    const observable:Observable<SocialUser | TokenResponse> 
    =  this.httpclientservice.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller:"auth"
    },user);
    const tokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      this.toastrService.Message("You authorized from google successfully!", "Success",{
        messageType:ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
      callBackFunction();
    }
  }
}