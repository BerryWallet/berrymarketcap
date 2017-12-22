import {
  IBerryMarketCap,
  IClientOptions,
  ITickerRequestOptions,
  IGlobalRequestOptions
} from '../index';

import axios, { AxiosInstance, AxiosPromise } from 'axios';
import qs from 'qs';
import {
  COINMARKETCAP_API_URL, 
  DEFAULT_API_VERSION
} from './constants'

export default class BerryMarketCap implements IBerryMarketCap {
  axios: AxiosInstance;

  constructor(options: IClientOptions = {}) {
    this.axios = axios.create({
      url: `${COINMARKETCAP_API_URL}/${options.version || DEFAULT_API_VERSION}`,
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
      }
    })
  }


  /**
   * Get ticker information
   *
   * @param {Object=} options Options for the request:
   * @param {Int=} options.limit  Only returns the top limit results
   * @param {String=} options.convert  Return price, 24h volume, and market cap in terms of another currency
   * @param {String=} options.currency  Return only specific currency
   *
   * @example
   * const berryCapClient = new BerryMarketCap()
   * berryCapClient.getTicker({limit: 3}).then(console.log).catch(console.error)
   * berryCapClient.getTicker({limit: 1, currency: 'bitcoin'}).then(console.log).catch(console.error)
   * berryCapClient.getTicker({convert: 'EUR'}).then(console.log).catch(console.error)
   */
  getTicker(options?: ITickerRequestOptions): AxiosPromise {
    let requestPath: string = '/ticker';
    if (options.currency) {
      requestPath = `${requestPath}/${options.currency.toLowerCase()}`;
    }

    const params = {
      convert: options.convert ? options.convert.toUpperCase() : null,
      limit: options.limit || null
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
    const params = {};
    if (options.convert) {
      params['convert'] = options.convert.toUpperCase();
    }

    return this.axios.get('/global', {
      params: params
    });
  }
}
