import { Component, OnInit } from '@angular/core';
import { JobModel } from '../jobs/jobs.model';
import { JobsService } from '../jobs.service';
import { AuthService } from '../auth.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';


@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit {
  title:String = "Job-Details";
  id='';
  job=<any>('');
  //private pid: string;
  singleJob:any;
  constructor(private jobService:JobsService,private router:Router,public _authService:AuthService,public activeRoute:ActivatedRoute) { }
  jobItem = new JobModel(null,null,null,null,null,null);
  
  ngOnInit(): void {  
   console.log('got till here!')
   this.activeRoute.params.subscribe(params=>{
   this.id = params['id']
   console.log(this.id)
  })
  this.jobService.editProduct(this.id).subscribe((result)=>{
  this.jobItem = JSON.parse(JSON.stringify(result));
  console.log("add");
  })
  }
  back(){
    this.router.navigate([''])
  }

}