import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  
  helper = new JwtHelperService();
  constructor(private router:Router) {}

  canActivate()
  {
    if(localStorage.getItem('token'))
    {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
