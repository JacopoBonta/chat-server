import * as io from 'socket.io';
import { ChatChannel } from './ChatChannel';
import { BroadcastChannel } from './BroadcastChannel';
import { GroupChannel } from './GroupChannel';

export enum ChannelTypes { CHAT, BR, GROUP }

export abstract class Channel {
    constructor(private eventName: string, private socket: io.Socket) {}

    static createChannel(t: ChannelTypes, event: string, socket: io.Socket): Channel {
        switch (t) {
            case ChannelTypes.CHAT:
                return new ChatChannel(event, socket);
            case ChannelTypes.BR:
                return new BroadcastChannel(event, socket);
            case ChannelTypes.GROUP:
                return new GroupChannel(event, socket);
            default:
                throw new Error('invalid ChannelTypes')
        }
    }
}