import { BasePublisher } from "../base/base-publisher";
import { Exchange } from "../constants/exchange";
import { RouteKey } from "../constants/route-keys";
import { UserCreateEvent } from "../types/user-create-event";

export class UserCreatePublisher extends BasePublisher<UserCreateEvent> {
    exchange: Exchange = Exchange.user;
    routeKey: RouteKey = RouteKey.userCreated;
}