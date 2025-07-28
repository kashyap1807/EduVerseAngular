import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private spinner:NgxSpinnerService,private toastr:ToastrService) { }
    // This method intercepts HTTP requests and allows you to modify them before they are sent.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show(); // Show the spinner when a request is made
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // this.toastr.success('Request completed successfully!'); // Show success message on response
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // this.toastr.error(`Request failed: ${error.message}`); 
                return throwError(error);
            }),
            finalize(() => {
                this.spinner.hide(); // Hide the spinner when the request is completed
            })
        );
    }
}