import apmq, { Channel, ConsumeMessage } from "amqplib";
import { BaseEvent } from "../types/base-event";
import { BroadcastType } from "../constants/constant";

export abstract class BaseSubscriber<T extends BaseEvent> {
  abstract exchange: T["exchange"];
  abstract routeKey: T["routeKey"];

  private channel: Channel;
  private broadcastType: BroadcastType;

  constructor(channel: Channel, broadcastType: BroadcastType = "direct") {
    this.channel = channel;
    this.broadcastType = broadcastType;
  }

  abstract onMessage(data: T["data"]): Promise<void>;

  async subscribe() {
    await this.channel.assertExchange(this.exchange, this.broadcastType, {
      durable: false,
    });
    const q = await this.channel.assertQueue("", {
      exclusive: true,
    });
    this.channel.bindQueue(q.queue, this.exchange, this.routeKey);
    this.channel.consume(
      q.queue,
      async (msg: ConsumeMessage | null) => {
        if (!msg) return;
        try {
          const data = JSON.parse(msg.content.toString());
          this.onMessage(data).then(() => {
            console.log("success ack");
            this.channel.ack(msg);
          });
        } catch (err) {
          console.error("Failed to process message:", err);
        }
      },
      { noAck: false },
    );
  }
}
