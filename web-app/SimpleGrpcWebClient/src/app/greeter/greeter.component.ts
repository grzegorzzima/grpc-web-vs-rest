import { Component, OnInit } from '@angular/core';
import { HelloReply, HelloRequest } from 'src/generated/greet_pb';
import { GreeterClient, ServiceError, Greeter } from 'src/generated/greet_pb_service';
import {grpc} from "@improbable-eng/grpc-web";

@Component({
  selector: 'app-greeter',
  templateUrl: './greeter.component.html',
  styleUrls: ['./greeter.component.sass']
})
export class GreeterComponent implements OnInit {

  response: string;

  constructor() { 
    this.response = "Let's start";
  }

  ngOnInit(): void {
    const client = new GreeterClient('https://localhost:7055');
    const req = new HelloRequest();
    req.setName("Grzegorz");
    client.sayHello(req, (error: ServiceError | null, responseMessage: HelloReply | null) => {
      if(error){
        console.log(error.metadata);
        this.response = error.message;
        return;
      }
      this.response = responseMessage != null ? responseMessage.getMessage() : "";
    });
  }

}
