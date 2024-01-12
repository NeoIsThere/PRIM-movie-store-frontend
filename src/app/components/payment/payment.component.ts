import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{16}/),
    ]),
    expirationDate: new FormControl('', [Validators.required]),
  });

  constructor(
    private httpClient: HttpClientService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onPayClick() {
    const moviesIDs = this.localStorageService.getData('moviesIDs');

    if (!moviesIDs) {
      return;
    }

    const paymentDetails = this.form.value;
    this.httpClient
      .postResponseTypeText('/payment', { moviesIDs, paymentDetails })
      .subscribe((response: any) => {
        this.localStorageService.removeAllData();
        this.router.navigateByUrl("");
      });
  }
}
