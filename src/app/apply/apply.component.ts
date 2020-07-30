import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
 alert:boolean = false;
 resume:File=null;

  applyUserData = {fullname:'',email:'',resume:'' }
  constructor(private _auth:AuthService,private _router:Router) { }

  ngOnInit(): void {
  }

   applyUser(){
     console.log('test');
    this._auth.applyUser(this.applyUserData,this.resume)
    .subscribe(
      res=> {
        console.log(res)
        localStorage.setItem('token',res.token)  
        this.alert=true;
        this._router.navigate(['/'])
        setTimeout(() => {
          this.closeAlert();
        }, 3000);
      }, 
      err=> console.log(err)
    )
    //  this._router.navigate(['/'])
   }

   onFileChange(event){
     this.resume=event.target.files[0];
   }

  closeAlert(){
    this.alert=false;
    this._router.navigate(['/'])
  }
  
}

