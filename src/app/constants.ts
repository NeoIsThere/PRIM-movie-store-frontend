import { HttpHeaders } from '@angular/common/http';

export const HTTP_CONTENT_TYPE_JSON = new HttpHeaders({
  'Content-Type': 'application/json',
});

export const HTTP_CONTENT_TYPE_MULTIPART_FORM_DATA = new HttpHeaders({
  'Content-Type': 'multipart/form-data',
});

export const HTTP_RESPONSE_TYPE_TEXT = new HttpHeaders({
  /*To tell the parser so there is no error because it tries to parse JSON*/
  /* The response type is text whenever the server returns HTML files or only status codes without body.*/
  responseType: 'text',
});

export const HTTP_WITH_CREDENTIAL_OPTION = {
  withCredentials: true,
};

export const API_BASE_URL = 'http://localhost:8001';
