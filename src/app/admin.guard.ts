import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // } canActivate():boolean{
    constructor(private _authService:AuthService,private _router:Router){ }
    canActivate():boolean{
    if(this._authService.getIsAdmin()){
      return true;
    }else{
      this._router.navigate(['/admin'])
      return false;
    }
  }
  
}
