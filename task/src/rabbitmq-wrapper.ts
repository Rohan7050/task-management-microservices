import amqp from "amqplib";

class RabbitMQWrapper {
  private _channel: amqp.Channel | undefined;

  get channel() {
    if (!this._channel) {
      throw new Error("channel must be defined");
    }
    return this._channel;
  }

  async connect(url: string) {
    try {
      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();
      this._channel = channel;
      console.log('connect successfully to rabbitmq')
    } catch (e) {
      throw e;
    }
  }
}

export const rabbitMQWrapper = new RabbitMQWrapper();
