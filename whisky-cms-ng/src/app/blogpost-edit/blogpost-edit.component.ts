import { Component, OnInit ,ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,FormGroupDirective } from '@angular/forms';
import {BlogpostService} from '../blogpost.service';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-blogpost-edit',
  templateUrl: './blogpost-edit.component.html',
  styleUrls: ['./blogpost-edit.component.css']
})
export class BlogpostEditComponent implements OnInit {
  blogpostId: string;
  blogpost: Blogpost;

  constructor( private blogpostService: BlogpostService, private el: ElementRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.blogpostId = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogpostService.getBlogpostsById(this.blogpostId)
      .subscribe(data => {
        this.blogpost = data;
        console.log('var',this.blogpost);
      }, 
      error => console.error(error));
  
  }
 
  upload() {
    //retrieve file upload HTML tag
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    console.log(inputEl);
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    // make sure a file was selected.
    if (fileCount > 0) { 
      //append the key name 'image' with the first file in the element
      formData.append('image', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(data => console.log(data), error => console.error(error));
      };
  }
  updateBlogpost(formDirective: FormGroupDirective) {
    /*if( this.editform.valid){
      console.log(this.editform.value);
    const editedBlogpost = this.editform.value;
    this.blogpostService
    .updateBlogposts(this.blogpostId, editedBlogpost)
    .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    }*/
    const editedBlogpost = this.blogpost;
    this.blogpostService.updateBlogposts(this.blogpostId,editedBlogpost)
    .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
  }
  handleSuccess(data, formDirective) {
    console.log('OK handleSuccess - blog post updated', data);
    formDirective.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data._id);
  }
  
  handleError(error) {
    console.log('KO handleError - blog post NOT updated', error);
  }

}
