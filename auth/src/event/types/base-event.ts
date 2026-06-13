import { Exchange } from "../constants/exchange";
import { RouteKey } from "../constants/route-keys";

export interface BaseEvent {
    exchange: Exchange;
    routeKey: RouteKey;
    data: any;
}