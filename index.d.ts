import {AxiosInstance, AxiosPromise} from "axios";

export interface IClientOptions {
    url?: string
    version?: string
    timeout?: number
}

export interface ITickerRequestOptions {
    limit?: number;
    convert?: string;
}

export interface IGlobalRequestOptions {
    convert?: string;
}

export interface ITickerData {
    id: string;
    name: string;
    symbol: string;
    rank: string;
    price_usd: string;
    price_btc: string;
    "24h_volume_usd": string;
    market_cap_usd: string;
    available_supply: string;
    total_supply: string;
    percent_change_1h: string;
    percent_change_24h: string;
    percent_change_7d: string;
    last_updated: string;
    [any]: string
}

export interface IBerryMarketCap {
    axios: AxiosInstance;
    options: IClientOptions;

    getTicker(currency: string, options?: ITickerRequestOptions): Promise<ITickerData>;

    getTickers(options?: ITickerRequestOptions): Promise<ITickerData[]>;

    getGlobal(options?: IGlobalRequestOptions): Promise<any>;
}

declare function createBerryMarketCapClient(options?: IClientOptions): IBerryMarketCap;

export default createBerryMarketCapClient;