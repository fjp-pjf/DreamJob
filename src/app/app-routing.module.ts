import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { AddjobComponent } from './addjob/addjob.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ApplyComponent } from './apply/apply.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [{path:"",component:JobsComponent},
                        {path:"mainpage",component:MainpageComponent},
                        {path:"add",component:AddjobComponent,canActivate:[AuthGuard,AdminGuard]},
                        {path:"apply",component:ApplyComponent},
                        {path:"jobdetails/:id",component:JobdetailsComponent,canActivate:[AuthGuard]},
                        {path:'login',component:LoginComponent},
                        {path:"register",component:RegisterComponent},
                        {path:'admin',component:AdminComponent},
                        {path:'update/:jobId',component:AddjobComponent,canActivate:[AuthGuard]},
                        {path:'delete/:jobId',component:JobsComponent,canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
