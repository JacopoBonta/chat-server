import http from 'http';
import io from 'socket.io';
import { EventEmitter } from 'events';
import { User } from './User/user';
import { Message } from './Message/Message';

export default class IoServer extends EventEmitter {
    private io: io.Server;
    private connectedSocket: Array<io.Socket>;
    private onConnectionHandler: Function;

    constructor(private httpServer: http.Server) {
        super();
        this.io = io(this.httpServer);
        this.connectedSocket = [];

        this.io.use((socket, next) => {
            let token = socket.handshake.query.token;

            if (isValid(token)) {
                return next();
            }

            return next(new Error('invalid token'));
        })

        
        this.io.on('connection', (socket) => {

            
            this.connectedSocket.push(socket)

            let token = socket.handshake.query.token;
            let user: User = find(token);

            
            let channel: string;

            socket.on(channel, (message: Message) => {

            })

            this.emit('new_user', user)
        })
        
        // init handlers
        this.onConnectionHandler = (socket: io.Socket) => console.log(`User ${socket.id} connected`)
    }

    private load() {
        this.io.on('connection', (socket) => {
            
            this.onConnectionHandler(socket)
        })
    }

    public listen(port: number, address: string) {
        const serverPort = port
        const serverAddress = address
        this.load()
        this.httpServer.listen(serverPort, serverAddress, function() {
            console.log(`listening on ${serverAddress}:${serverPort}`);
        });
    }
}