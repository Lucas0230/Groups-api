import Mongoose from 'mongoose';
import Database from '../config/database';

import UsersModel from '../app/models/User';

// models
const models = [UsersModel];

class Connect {
    init() {
        Mongoose.connect(Database.url, Database.options)
            .then(dbc => {
                models.map(model => {
                    model.init(dbc)
                })
                console.log('BANCO CONECTADO COM SUCESSO')
            })
            .catch(e => e);
    }
}

export default new Connect().init();
