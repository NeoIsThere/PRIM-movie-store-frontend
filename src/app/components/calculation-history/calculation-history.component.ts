import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Calculation } from '../interfaces';

@Component({
  selector: 'app-calculation-history',
  templateUrl: './calculation-history.component.html',
  styleUrls: ['./calculation-history.component.css'],
})
export class CalculationHistoryComponent implements OnInit {
  calculations: Calculation[] = [];

  constructor(private httpClient:HttpClientService) {}

  ngOnInit(): void {}

  onRefreshClick(){
    this.httpClient.get('/calculations').subscribe((calculationsResponse: Calculation[])=>{
      console.log(this.calculations);
      this.calculations = calculationsResponse;
    })
  }
}
