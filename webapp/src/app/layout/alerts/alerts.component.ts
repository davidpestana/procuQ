import { Component, OnInit } from '@angular/core';
import { AlertsService, Alert } from '../../shared/services';

@Component({
  selector: '[app-alerts]',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts:Alert[];

  constructor(private alertsService:AlertsService) { }

  ngOnInit() {
    this.alertsService.get().subscribe((alerts:Alert[])=>{
      this.alerts = alerts;
      console.log(alerts);
    })
  }

}
