import { Component, OnInit, ViewChild } from '@angular/core';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { WeatherData } from 'src/.generated/weather_pb';
import { Status, WeatherForecastClient } from 'src/.generated/weather_pb_service';
import {MatTable} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class WeatherElement {
  temperature!: number;
  summary!: string;
  timestamp!: string | undefined;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  client: WeatherForecastClient;
  weather: WeatherElement[];
  displayedColumns: string[] = ['temperature', 'summary', 'timestamp'];

  @ViewChild(MatTable) table: MatTable<WeatherElement> | undefined;

  constructor() {
    this.weather = new Array<WeatherElement>(); 
    this.client = new WeatherForecastClient("https://localhost:7055");
  }

  ngOnInit(): void {
    this.client.getWeatherStream(new Empty)
      .on('status', (status: Status) => {
        console.log('getStream.status', status)
      })
      .on('data', (message: WeatherData) => {
        console.log(message.getDatetimestamp()?.toDate());
        var element = new WeatherElement();
        element.temperature = message.getTemperaturec();
        element.summary = message.getSummary();
        element.timestamp = message.getDatetimestamp()?.toDate().toDateString();
        this.weather.push(element);
        this.table?.renderRows();
      });
  }
}
