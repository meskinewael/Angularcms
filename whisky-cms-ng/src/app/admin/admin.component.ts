import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../models/blogpost';
import { Router } from '@angular/router';
import { AuthService} from './../auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  //get all blog post
 blogposts$ : Observable <Blogpost[]>
  constructor(private blogpostService: BlogpostService, private Auth: AuthService,private router: Router) { }
  
  allBlogposts : Blogpost[];
  errorFromServer = '';

  ngOnInit() {
    if (!this.Auth.isAuthenticaded)
    {
    this.router.navigate(['/auth'])
    }
   this.blogposts$ = this.blogpostService.getBlogposts();
   this.blogpostService.getBlogposts().subscribe(data => this.refresh(data));
   this.blogpostService.handleBlogpostCreated().subscribe(data=>{
    console.log('admin component recived',data);
    this.refresh(data);
  });
  }
  /*deleteBlogPosts(selectedoptions)
  {
    const ids = selectedoptions.map(so=>so.value)
    this.blogpostService.deleteSingelBlogPost
  }*/
 
  deleteBlogPosts(selectedOptions) {
    const ids = selectedOptions.map(so => so.value);
    if (ids.length === 1) {
      console.log('ids',ids);
      return this.blogpostService
        .deleteSingelBlogPost(ids[0])
        .subscribe(data => this.refresh(data), err => this.handleError(err));
    } else {
      return this.blogpostService
        .deleteBlogposts(ids)
        .subscribe(data => this.refresh(data), err => this.handleError(err));
    }
  }
  refresh(data) {
    console.log('data', data);
    this.blogpostService.getBlogposts().subscribe(data => {
      this.allBlogposts = data;
    });
  }

  handleError(error) {
    if(error.status === 401) {
      this.router.navigate(['/auth']);
    } else {
      this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
    }
  }
  logout()
  {
    this.Auth.logout().subscribe(data=>{
      console.log(data);
      this.router.navigate(['/auth'])
    },error=>console.error('err'));
  }

}
