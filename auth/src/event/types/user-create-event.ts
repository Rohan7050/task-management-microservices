import { Exchange } from "../constants/exchange";
import { RouteKey } from "../constants/route-keys";

export interface UserCreateEvent {
  exchange: Exchange.user;
  routeKey: RouteKey.userCreated;
  data: {
    id: string;
    username: string;
    email: string;
  };
}
