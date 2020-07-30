import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { AuthService } from '../auth.service';
import { JobModel } from './jobs.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  title:String = "Jobs";
  //creating service object for calling get jobs()
  
  constructor(private jobService:JobsService,private router:Router,public _authService:AuthService) { }
  jobItem = new JobModel(null,null,null,null,null,null);
  //job is the model class for job item
  //jobs: JobModel[];
  jobs:any;
  ngOnInit(): void {
   //calling getjobs() and loading the jobs to the jobsarray
    this.jobService.getJobs().subscribe((data)=>{
      this.jobs = JSON.parse(JSON.stringify(data));
    })
  }

delete(job,index){
  console.log(job);
  if(confirm('This item will be deleted!')===true){
  this.jobs.splice(index,1)
  this.jobService.deleteJob(job._id)
  .subscribe((data)=>{
    console.log('deleted',data);
  }) 
 }
 this.router.navigate(['/'])
 }//delete job

}//total end
