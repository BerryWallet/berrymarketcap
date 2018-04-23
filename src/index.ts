import {BerryMarketCap} from "./client";
import {IBerryMarketCap, IClientOptions} from "../index";

function createBerryMarketCapClient(options?: IClientOptions): IBerryMarketCap {
    return new BerryMarketCap(options);
}

export default createBerryMarketCapClient;