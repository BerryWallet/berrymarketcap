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

export interface IBerryMarketCap {
    axios: AxiosInstance;
    options: IClientOptions;

    getTicker(currency: string, options?: ITickerRequestOptions): AxiosPromise;
    getTickers(options?: ITickerRequestOptions): AxiosPromise;
    getGlobal(options?: IGlobalRequestOptions): AxiosPromise;
}

declare function createBerryMarketCapClient(options?: IClientOptions): IBerryMarketCap;

export default createBerryMarketCapClient;