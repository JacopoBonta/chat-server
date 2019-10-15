import { Channel } from './Channel';
import { User } from '../User/user';
import * as io from 'socket.io';

export class ChatChannel extends Channel {
    private userA: User | null
    private userB: User | null

    constructor(event: string, socket: io.Socket, userA?: User, userB?: User) {
        super(event, socket);
        
        this.userA = userA || null;
        this.userB = userB || null;
    }
}