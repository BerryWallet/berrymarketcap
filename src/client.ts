import {
    IBerryMarketCap,
    ITickerData,
    IClientOptions,
    ITickerRequestOptions,
    IGlobalRequestOptions
} from '../index';

import {
    defaultTickerRequestOptions,
    defaultClientOptions,
    defaultGlobalRequestOptions
} from './default';

import axios, {AxiosInstance, AxiosPromise, AxiosResponse} from 'axios';

export class BerryMarketCap implements IBerryMarketCap {
    axios: AxiosInstance;
    options: IClientOptions;

    public constructor(options?: IClientOptions) {

        this.options = Object.assign({}, defaultClientOptions, options);

        this.axios = axios.create({
            baseURL: `${this.options.url}/${this.options.version}`,
            timeout: this.options.timeout
        })
    }

    /**
     * @param {AxiosResponse} response
     * @returns {any}
     */
    protected handleResponse(response: AxiosResponse): any {
        return response.data;
    }

    /**
     * Get specific ticker information
     *
     * @example
     * const berryCapClient = new BerryMarketCap()
     * berryCapClient.getTicker('bitcoin', {convert: 'EUR'}).then(console.log).catch(console.error)
     */
    public getTicker(currency: string, options?: ITickerRequestOptions): Promise<ITickerData> {
        const requestOptions = Object.assign({}, defaultTickerRequestOptions, options);

        const params = {
            convert: requestOptions.convert ? requestOptions.convert.toUpperCase() : null
        };

        return this.axios
            .get(`/ticker/${currency.toLowerCase()}/`, {
                params: params
            })
            .then(this.handleResponse).then((tickerData) => {
                return tickerData[0];
            })
    }

    /**
     * Get all tickers information
     *
     * @example
     * const berryCapClient = new BerryMarketCap()
     * berryCapClient.getTicker({limit: 100, convert: 'EUR'}).then(console.log).catch(console.error)
     */
    public getTickers(options?: ITickerRequestOptions): Promise<ITickerData[]> {
        const requestOptions = Object.assign({}, defaultTickerRequestOptions, options);

        const params = {
            convert: requestOptions.convert ? requestOptions.convert.toUpperCase() : null,
            limit: requestOptions.limit ? requestOptions.limit : null
        };

        return this.axios
            .get('/ticker/', {
                params: params
            })
            .then(this.handleResponse);
    }


    /**
     * Get global information
     *
     * @param {Object|String=} options  Options for the request
     * @param {String=} options.convert  Return price, 24h volume, and market cap in terms of another currency
     *
     * @example
     * const berryCapClient = new BerryMarketCap()
     * berryCapClient.getGlobal({convert: 'GBP'}).then(console.log).catch(console.error)
     */
    public getGlobal(options?: IGlobalRequestOptions): Promise<any> {
        const requestOptions = Object.assign({}, defaultGlobalRequestOptions, options);

        const params = {};
        if (requestOptions.convert) {
            params['convert'] = options.convert.toUpperCase();
        }

        return this.axios
            .get('/global', {
                params: params
            })
            .then(this.handleResponse)
    }
}