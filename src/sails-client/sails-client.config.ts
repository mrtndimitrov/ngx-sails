import { InjectionToken } from '@angular/core';
import { SocketIOConnectOpts } from '../io';

export interface ISailsClientConfig {
  uri?: string,
  headers?: any,
  ioOptions?: SocketIOConnectOpts
}

export let SAILS_CLIENT_CONFIG = new InjectionToken<ISailsClientConfig>('sails.client.config');
