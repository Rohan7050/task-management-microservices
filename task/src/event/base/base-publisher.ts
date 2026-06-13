import amqp, { Channel } from "amqplib";
import { BaseEvent } from "../types/base-event";
import { BroadcastType } from "../constants/constant";

export abstract class BasePublisher<T extends BaseEvent> {
  abstract exchange: T["exchange"];
  abstract routeKey: T["routeKey"];

  protected channel: Channel;
  protected broadcastType: BroadcastType;

  constructor(channel: Channel, broadcastType: BroadcastType = "direct") {
    this.channel = channel;
    this.broadcastType = broadcastType;
  }

  async init() {
    await this.channel.assertExchange(this.exchange, this.broadcastType, {
      durable: false,
    });
  }

  async publish(data: T["data"]): Promise<void> {
    await this.init()
    const stringData = JSON.stringify(data);
    this.channel.publish(this.exchange, this.routeKey, Buffer.from(stringData));
  }
}
