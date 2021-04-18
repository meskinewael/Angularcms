import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { BlogpostEditComponent } from './blogpost-edit/blogpost-edit.component';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { ErrordfpageComponent } from './errordfpage/errordfpage.component';

const routes: Routes = [
  {path:'',component :BlogpostListComponent},
  {path:'blog-posts-db/:id',component :BlogpostComponent},
  {path:'admin', component : AdminComponent},
  {path:'auth', component: AuthComponent},
  {path:'admin/blog-posts/:id',component : BlogpostEditComponent},
  {path:'**',component : ErrordfpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
