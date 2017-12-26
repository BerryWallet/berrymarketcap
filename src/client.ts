import {
    IBerryMarketCap,
    IClientOptions,
    ITickerRequestOptions,
    IGlobalRequestOptions
} from '../index';

import {
    defaultTickerRequestOptions,
    defaultClientOptions,
    defaultGlobalRequestOptions
} from './default';

import axios, {AxiosInstance, AxiosPromise} from 'axios';

export class BerryMarketCap implements IBerryMarketCap {
    axios: AxiosInstance;
    options: IClientOptions;

    constructor(options?: IClientOptions) {

        this.options = Object.assign({}, defaultClientOptions, options);

        this.axios = axios.create({
          baseURL: `${this.options.url}/${this.options.version}`,
          timeout: 3000          
        })
    }

    /**
     * Get ticker information
     *
     * @example
     * const berryCapClient = new BerryMarketCap()
     * berryCapClient.getTicker({limit: 3}).then(console.log).catch(console.error)
     * berryCapClient.getTicker({limit: 1, currency: 'bitcoin'}).then(console.log).catch(console.error)
     * berryCapClient.getTicker({convert: 'EUR'}).then(console.log).catch(console.error)
     */
    getTicker(options?: ITickerRequestOptions): AxiosPromise {
        let requestPath: string = '/ticker';

        const requestOptions = Object.assign({}, defaultTickerRequestOptions, options);

        if (requestOptions.currency) {
            requestPath = `${requestPath}/${requestOptions.currency.toLowerCase()}`;
        }

        const params = {
            convert: requestOptions.convert ? requestOptions.convert.toUpperCase() : null,
            limit: requestOptions.limit || null
        };

        return this.axios.get(requestPath, {
            params: params
        });
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
    getGlobal(options?: IGlobalRequestOptions): AxiosPromise {
        const requestOptions = Object.assign({}, defaultGlobalRequestOptions, options);

        const params = {};
        if (requestOptions.convert) {
            params['convert'] = options.convert.toUpperCase();
        }

        return this.axios.get('/global', {
            params: params
        });
    }
}

function createBerryMarketCapClient(options?: IClientOptions): IBerryMarketCap {
    return new BerryMarketCap(options);
}

export default createBerryMarketCapClient;