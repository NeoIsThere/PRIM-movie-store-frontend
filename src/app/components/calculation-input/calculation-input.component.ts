import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Calculation } from '../interfaces';

@Component({
  selector: 'app-calculation-input',
  templateUrl: './calculation-input.component.html',
  styleUrls: ['./calculation-input.component.css'],
})
export class CalculationInputComponent implements OnInit {
  calculation: string = '';
  answer: string = '';

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {}

  onGoClick() {
    this.httpClientService
      .post('/calculation', { calculation: this.calculation })
      .subscribe((response: Calculation) => {
        console.log(response);
        this.answer = response.equation.split('=')[1].split('.')[0];
      });
    this.calculation = '';
  }
}
