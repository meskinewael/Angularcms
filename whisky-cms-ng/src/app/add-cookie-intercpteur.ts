import { HttpInterceptor ,HttpRequest, HttpHandler,HttpEvent} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable()
export class AddCookieInterceptor implements HttpInterceptor{

intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>>{
console.log(`Add cookie intercept ${req.url} with method ${req.url}`);
const reqWithCookie: HttpRequest<any> =req.clone({
    withCredentials :true,
});
return next.handle(reqWithCookie); 
}
}