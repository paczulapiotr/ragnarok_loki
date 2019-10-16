import { HubConnectionBuilder } from "@aspnet/signalr";

var connection = new HubConnectionBuilder().withUrl("").build();
