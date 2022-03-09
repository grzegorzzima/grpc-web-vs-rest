// package: greet
// file: weather.proto

var weather_pb = require("./weather_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var WeatherForecast = (function () {
  function WeatherForecast() {}
  WeatherForecast.serviceName = "greet.WeatherForecast";
  return WeatherForecast;
}());

WeatherForecast.GetWeatherStream = {
  methodName: "GetWeatherStream",
  service: WeatherForecast,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: weather_pb.WeatherData
};

exports.WeatherForecast = WeatherForecast;

function WeatherForecastClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

WeatherForecastClient.prototype.getWeatherStream = function getWeatherStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WeatherForecast.GetWeatherStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.WeatherForecastClient = WeatherForecastClient;

