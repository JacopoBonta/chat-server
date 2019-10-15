import * as dotenv from 'dotenv';
import * as http from 'http';
import IoServer from './IoServer';
import express from 'express';

const app = express();

dotenv.config({ path: `${__dirname}/.env`});
const { SERVER_ADDRESS, SERVER_PORT } = process.env;

if (!SERVER_ADDRESS) {
    throw new Error('SERVER_ADDRESS is undefined')
}

if (!SERVER_PORT) {
    throw new Error('SERVER_PORT is undefined')
}

const chatServer = new IoServer(http.createServer(app));
chatServer.listen(Number(SERVER_PORT), SERVER_ADDRESS);