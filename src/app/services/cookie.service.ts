import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  getCookie(desiredKey: string): string | null {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (!decodedCookie) {
      return null;
    }
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      const cookieKeyValue = cookieArray[i].replace(/ /g, '');
      const cookieKeyValueSplitted = cookieKeyValue.split('=');
      const key = cookieKeyValueSplitted[0];
      const value = cookieKeyValueSplitted[1];

      if (key == desiredKey) {
        return value;
      }
    }

    return null;
  }

  setCookie(key: string, value: string) {
    document.cookie = `${key}=${value}`;
  }
}
