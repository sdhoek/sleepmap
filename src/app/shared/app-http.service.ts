import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppHttpService {

  constructor(private http: HttpClient) { }

    public currentRequests = 0;

    public get isRequestsRunning() {
      return this.currentRequests > 0;
    }

    public get(url: string, options?: any): Promise<any> {
      this.addRequest();
      return this.http.get(url, options).toPromise()
        .then(result => {
          this.removeRequest();
          return result;
        })
        .catch(error => {
          this.removeRequest();
          return error;
        });
    }

    public post(url: string, body: any, options?: any): Promise<any> {
      this.addRequest();
      return this.http.post(url, body, options).toPromise()
        .then(result => {
          this.removeRequest();
          return result;
        })
        .catch(error => {
          this.removeRequest();
          return error;
        });
    }

    public put(url: string, body: any, options?: any): Promise<any> {
      this.addRequest();
      return this.http.put(url, body, options).toPromise()
        .then(result => {
          this.removeRequest();
          return result;
        })
        .catch(error => {
          this.removeRequest();
          return error;
        });
    }

    public delete(url: string, options?: any): Promise<any> {
      this.addRequest();
      return this.http.delete(url, options).toPromise()
        .then(result => {
          this.removeRequest();
          return result;
        })
        .catch(error => {
          this.removeRequest();
          return error;
        });
    }

    private addRequest(): void {
      this.currentRequests+= 1;
    }

    private removeRequest(): void {
      this.currentRequests-= 1;
    }
}
