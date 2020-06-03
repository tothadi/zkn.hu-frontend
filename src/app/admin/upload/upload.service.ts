import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { News } from 'src/app/news.service';

@Injectable()
export class UploadService {

  public news
  public url = '';

  constructor(private http: HttpClient) { }

  public getNews(news, url) {
    this.news = news;
    this.url = url
  }

  public getImageCount(count) {
    this.news.picCount = count;
  }

  public upload(
    files: Set<File>
  ): { [key: string]: { progress: Observable<number> } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    const newsString = JSON.stringify(this.news).replace(/\\n\\n\\n/g, '</p><h4>').replace(/\\n\\n/g, '</h4><p>').replace(/\\n/g, '</p><p>')

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();

      formData.append('file', file, newsString)

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
          console.log(Response);
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    this.url = ''
    // return the map of progress.observables
    return status;
  }
}