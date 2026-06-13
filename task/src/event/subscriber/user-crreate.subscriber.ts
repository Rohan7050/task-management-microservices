import { User } from "../../models/user-schema";
import { BaseSubscriber } from "../base/base-subscriber";
import { Exchange } from "../constants/exchange";
import { RouteKey } from "../constants/route-keys";
import { UserCreateEvent } from "../types/user-create-event";

export class UserCreatedSubscriber extends BaseSubscriber<UserCreateEvent> {
  exchange: Exchange = Exchange.user;
  routeKey: RouteKey = RouteKey.userCreated;
  async onMessage(data: {
    id: string;
    username: string;
    email: string;
  }): Promise<void> {
    try {
      const user = User.build(data);
      await user.save();
    } catch (e) {
      throw new Error("Error in processing msg");
    }
  }
}
