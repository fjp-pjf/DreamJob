import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http:HttpClient) { }
  getJobs(){
    return this.http.get("http://localhost:3000/api/jobs");
  }
  newJob(item){
    return this.http.post("http://localhost:3000/api/insert",{"job":item})
    .subscribe(data=>{console.log(data)})
  }
  updateJob(item,pid){
    return this.http.put<any>("http://localhost:3000/api/update",{"job":item,"pid":pid})
    .subscribe(data=>{console.log(data)})
  }
  getSingleJob(pid:string){
    return this.http.get<any>(`http://localhost:3000/api/singleJob/${pid}`);
  }

  deleteJob(i){
    return this.http.delete<any>(`http://localhost:3000/api/jobs/${i}`);
  }

  editProduct(id){
    return this.http.get<any>(`http://localhost:3000/api/read/${id}`)
  }
}
