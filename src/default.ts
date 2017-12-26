import {
    IClientOptions,
    ITickerRequestOptions,
    IGlobalRequestOptions
} from '../index';

import {
    COINMARKETCAP_API_URL,
    DEFAULT_API_VERSION
} from './constants'

export const defaultTickerRequestOptions: ITickerRequestOptions = {
    limit: 100,
    convert: null
};

export const defaultClientOptions: IClientOptions = {
    url: COINMARKETCAP_API_URL,
    version: DEFAULT_API_VERSION,
    timeout: 5000
};

export const defaultGlobalRequestOptions: IGlobalRequestOptions = {
    convert: null
};