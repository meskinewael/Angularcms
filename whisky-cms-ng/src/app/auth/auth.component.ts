import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user'
import {AuthService} from './../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: User = { username: '' , password:''};
  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login(){
    console.log('user',this.user);
    this.AuthService.login(this.user).subscribe(
      data => this.handelSuccess(data), error=> this.handelError(error)
    );
  }
  handelSuccess(data)
  {
    console.log('logged in', data);
    this.router.navigate(['/admin']);
  }
  handelError(error)
  {
    console.log('Not logged in',error);
  }

}
