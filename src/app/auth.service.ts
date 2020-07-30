import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdmin = false;
  private adminStatusListener = new Subject<boolean>();
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private _adminUrl = "http://localhost:3000/api/admin";
  private _applyUrl = "http://localhost:3000/api/apply";

  constructor(private http:HttpClient,private _router:Router) { }
  registerUser(user){
    return this.http.post<any>(this._registerUrl,user)
  }

  applyUser(user,resume:File){
    const canData = new FormData();
    canData.append("fullname", user.fullname);
    canData.append("email", user.email);
    canData.append("resume", resume, user.fullname);
    return this.http.post<any>(this._applyUrl,canData)
  }

  loginAdmin(admin){
    this.http.post<any>(this._adminUrl,admin)
    .subscribe(
      res => {
        console.log(res)
       localStorage.setItem('token',res.token);
       localStorage.setItem('isAdmin','true');
       this.isAdmin=true;
       this.adminStatusListener.next(true);
       this._router.navigate([''])
      },
      err => console.log(err)
    )
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

  adminloggedIn() {
    return !!localStorage.getItem('token')
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.adminStatusListener.next(false);
    this.isAdmin = false;
    this._router.navigate(['/'])
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
