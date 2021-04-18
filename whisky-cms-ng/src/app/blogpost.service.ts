import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Blogpost} from './models/blogpost';


@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
 
  baseUrl ='http://localhost:3000/api/v1/blog-posts-db';
  //proxcy accepteur nom varaiable 
  private blogpostCreated = new Subject <string>();
  constructor(private HttpClient: HttpClient) { }
  
  createBlogposts(post : Blogpost)
  {
    return this.HttpClient.post<Blogpost>(this.baseUrl,post);
  }
  dispatchBlogpostCreated(id: string) {
    this.blogpostCreated.next(id);
  }
  handleBlogpostCreated() {
    return this.blogpostCreated.asObservable();
  }
  getBlogposts() : Observable<Blogpost[]>
  {
    return this.HttpClient.get<Blogpost[]>(`${this.baseUrl}/`);
  }
  getBlogpostsById(id) :Observable<Blogpost>
  {
    return this.HttpClient.get<Blogpost>(`${this.baseUrl}/${id}`);
  }
  deleteSingelBlogPost(id :string)
  {
    return this.HttpClient.delete(`${this.baseUrl}/${id}`);
  }
  deleteBlogposts(ids :string[])
  {
    const allids =ids.join(',');
    return this.HttpClient.delete(`${this.baseUrl}/?ids=${allids}`);
  }
  updateBlogposts(id: string ,blogpost: Blogpost )
  {
    return this.HttpClient.put(`${this.baseUrl}/${id}`,blogpost);
  }
  uploadImage(formData: FormData) {
    return this.HttpClient.post<any>(`${this.baseUrl}/images`, formData);
  }
}
