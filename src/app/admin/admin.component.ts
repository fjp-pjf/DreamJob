import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminData = {username:'',password:''}
  constructor(private _auth: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  loginAdmin(){
    console.log(this.adminData)
    this._auth.loginAdmin(this.adminData)
    
  }

}
