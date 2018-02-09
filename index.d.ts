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

    getTicker(currency: string, options?: ITickerRequestOptions): Promise<any>;

    getTickers(options?: ITickerRequestOptions): Promise<any>;

    getGlobal(options?: IGlobalRequestOptions): Promise<any>;
}

declare function createBerryMarketCapClient(options?: IClientOptions): IBerryMarketCap;

export default createBerryMarketCapClient;