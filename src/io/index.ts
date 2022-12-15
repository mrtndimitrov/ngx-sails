import 'socket.io-client';
import { io, Socket } from 'socket.io-client';

import { InjectionToken } from '@angular/core';
import * as io_ from 'socket.io-client';

type MySocketIOConnectOpts = {
    forceNew?: boolean;
    multiplex?: boolean;
    transports?: Array<string>;
    upgrade?: boolean;
    rememberUpgrade?: boolean;
    path?: string;
    query?: any;
};

export type SocketIOSocket = Socket;
export type SocketIOConnectOpts = MySocketIOConnectOpts;

export let IO_INSTANCE = new InjectionToken<any>('io.instance');

// const io: any = (<any>io_).default || io_;

export { io };
