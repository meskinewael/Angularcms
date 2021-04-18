import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEditorModule } from 'ngx-editor';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { MaterialModule}  from './material.module';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { ErrordfpageComponent } from './errordfpage/errordfpage.component';
import { AdminComponent } from './admin/admin.component';
import { BlogpostCreateComponent } from './blogpost-create/blogpost-create.component';
import { BlogpostEditComponent } from './blogpost-edit/blogpost-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AddCookieInterceptor } from './add-cookie-intercpteur';


@NgModule({
  declarations: [
    AppComponent,
    BlogpostComponent,
    BlogpostListComponent,
    ErrordfpageComponent,
    AdminComponent,
    BlogpostCreateComponent,
    BlogpostEditComponent,
    AuthComponent,
    
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxEditorModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: AddCookieInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
