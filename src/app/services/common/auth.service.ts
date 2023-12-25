import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private jwtHelper : JwtHelperService) { }
  identityCheck(){

    const token : string =localStorage.getItem("accessToken");
    const expirationDate=this.jwtHelper.getTokenExpirationDate(token)
    let expired : boolean;

    try{
      expired=this.jwtHelper.isTokenExpired(token); 
    }
    catch{
      expired=true;
    }

    _isAuthentucated = token!=null && !expired;
    
  }
  get isAuthentucated():boolean{
      return _isAuthentucated;
  }
}


export let _isAuthentucated : boolean;