import { AxiosInstance, AxiosPromise } from "axios";

export interface IClientOptions {
    version?: string
}

export interface ITickerRequestOptions {
    limit?: number;
    currency?: string;
    convert?: string;
}

export interface IGlobalRequestOptions {
    convert?: string;
}

export interface IBerryMarketCap {
    axios: AxiosInstance;

    getTicker(options?: ITickerRequestOptions): AxiosPromise;
    getGlobal(options?: IGlobalRequestOptions): AxiosPromise;
}

declare function createBerryMarketCapClient(options?: IClientOptions): IBerryMarketCap;

export default createBerryMarketCapClient;