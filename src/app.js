import routes from './routes';

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

process.env.BUILD == 'development'
    ? dotenv.config({ path: path.resolve(process.cwd(), '.env-development') })
    : dotenv.config({ path: path.resolve(process.cwd(), '.env-production') })


import './database/connect';

class App {
    constructor() {


        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors({
            origin: '*'
        }))

    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
