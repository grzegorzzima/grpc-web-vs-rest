// package: greet
// file: weather.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class WeatherData extends jspb.Message {
  hasDatetimestamp(): boolean;
  clearDatetimestamp(): void;
  getDatetimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDatetimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getTemperaturec(): number;
  setTemperaturec(value: number): void;

  getSummary(): string;
  setSummary(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WeatherData.AsObject;
  static toObject(includeInstance: boolean, msg: WeatherData): WeatherData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WeatherData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WeatherData;
  static deserializeBinaryFromReader(message: WeatherData, reader: jspb.BinaryReader): WeatherData;
}

export namespace WeatherData {
  export type AsObject = {
    datetimestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    temperaturec: number,
    summary: string,
  }
}

