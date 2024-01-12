import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(localStorage.getItem(key) as string);
    }
    return null;
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  removeAllData() {
    localStorage.clear();
  }
}
