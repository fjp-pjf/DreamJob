import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { JobModel } from '../jobs/jobs.model';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  public mode = "create";
  private pid: string;
  singleJob:any;
  title:String = "";
  constructor(private jobService:JobsService,private router:Router,public activeRoute:ActivatedRoute ) { }
  jobItem = new JobModel(null,null,null,null,null,null);

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("jobId")) {
        this.mode = "update";
        this.pid = paramMap.get("jobId");
        this.title='Update Job';
        // this.isLoading = true;
        this.jobService.getSingleJob(this.pid).subscribe(job => {
          // this.isLoading = false;
          this.singleJob = JSON.parse(JSON.stringify(job));
          console.log(this.singleJob);
          let {
            jobId,
            jobName,
            jobCompany,
            jobSalary,
            jobDate,
            jobDescription
              }=this.singleJob.job;

            this.jobItem= new JobModel(jobId,jobName,jobCompany,jobSalary,jobDate,jobDescription);
        });


      } else {
        this.mode = "create";
        this.pid = null;
        this.title="Create Job";
        this.jobItem= new JobModel(null,null,null,null,null,null);
      }
    });
  }
  

  AddJob(){
    if(this.mode=="create"){
      this.jobService.newJob(this.jobItem);
      console.log("called");
      alert("Success");
    }
    else{
      this.jobService.updateJob(this.jobItem,this.pid)
      console.log('Update successful');
      alert('item updated');
    }
    this.router.navigate(['/']);
  }

}


