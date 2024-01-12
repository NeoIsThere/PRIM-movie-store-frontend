import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Constants from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getHeaders() {
    return new HttpHeaders()
      .set('withCredentials', 'true')
      .set('Content-Type', 'application/json');
  }

  getHeadersForResponseTypeText() {
    return this.getHeaders().set('responseType', 'text');
  }

  public post(
    relativeUrl: string,
    body: any,
  ) {
    return this.httpClient
      .post<any>(Constants.API_BASE_URL + relativeUrl, body, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((err) => {
          //passing the function directly (i.e., handleError) prevents from being able to use this therefore this.router is undefined
          return this.handleError(err);
        })
      );
  }

  public postResponseTypeText(
    relativeUrl: string,
    body: any,
  ) {
    this.getHeadersForResponseTypeText();
    return this.httpClient
      .post(Constants.API_BASE_URL + relativeUrl, body, {
        responseType: 'text',
      })
      .pipe(
        catchError((err) => {
          //passing the function directly (i.e., handleError) prevents from being able to use this therefore this.router is undefined
          return this.handleError(err);
        })
      );
  }

  public put(
    relativeUrl: string,
    body: any,
    isResponseTypeText: boolean = true
  ) {
    let options = {
      ...Constants.HTTP_WITH_CREDENTIAL_OPTION,
      ...Constants.HTTP_CONTENT_TYPE_JSON,
    };

    if (isResponseTypeText) {
      options = {
        ...options,
        ...Constants.HTTP_RESPONSE_TYPE_TEXT,
      };
    }
    return this.httpClient
      .put<any>(Constants.API_BASE_URL + relativeUrl, body, options)
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  public patch(
    relativeUrl: string,
    body: any,
    isResponseTypeText: boolean = true
  ) {
    let options = {
      ...Constants.HTTP_WITH_CREDENTIAL_OPTION,
      ...Constants.HTTP_CONTENT_TYPE_JSON,
    };

    if (isResponseTypeText) {
      options = {
        ...options,
        ...Constants.HTTP_RESPONSE_TYPE_TEXT,
      };
    }
    return this.httpClient
      .patch<any>(Constants.API_BASE_URL + relativeUrl, body, options)
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  public get(
    relativeUrl: string,
    isResponseTypeText: boolean = false /*when fetching a page (HTML file)*/
  ) {
    let options = {};

    if (isResponseTypeText) {
      options = {
        ...options,
        ...Constants.HTTP_RESPONSE_TYPE_TEXT,
      };
    }

    return this.httpClient
      .get<any>(Constants.API_BASE_URL + relativeUrl, options)
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  public delete(relativeUrl: string, isResponseTypeText: boolean = true) {
    let options = {
      ...Constants.HTTP_WITH_CREDENTIAL_OPTION,
      ...Constants.HTTP_CONTENT_TYPE_JSON,
    };

    if (isResponseTypeText) {
      options = {
        ...options,
        ...Constants.HTTP_RESPONSE_TYPE_TEXT,
      };
    }
    return this.httpClient
      .delete<any>(Constants.API_BASE_URL + relativeUrl, options)
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  handleError(httpError: HttpErrorResponse) {
    const customMessage = httpError.error.message; //message set in server (ex. res.status(STATUS_CODES.UNAUTHORIZED).send({ message: "xxxxx" });)
    console.error(httpError.message);

    if (httpError.status === 0) {
      console.error('Error in client when performing the request.');
    } else {
      console.error(httpError.message);
    }
    return throwError(httpError.status);
  }
}
