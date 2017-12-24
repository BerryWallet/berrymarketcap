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
    currency: null,
    convert: null
};

export const defaultClientOptions: IClientOptions = {
    url: COINMARKETCAP_API_URL,
    version: DEFAULT_API_VERSION
};

export const defaultGlobalRequestOptions: IGlobalRequestOptions = {
    convert: null
};