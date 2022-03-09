import { Component, OnInit, ViewChild } from '@angular/core';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { WeatherData } from 'src/generated/weather_pb';
import { Status, WeatherForecastClient } from 'src/generated/weather_pb_service';
import {MatTable} from '@angular/material/table';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export class WeatherElement {
  temperature!: number;
  summary!: string;
  timestamp!: string | undefined;

  constructor(){
  }
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
