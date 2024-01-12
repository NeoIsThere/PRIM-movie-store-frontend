import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public paymentSubject: Subject<string> = new Subject()

  constructor() { 
  }

  notifyPaymentSuccessful(movieID: string){
    this.paymentSubject.next(movieID);
  }


}
