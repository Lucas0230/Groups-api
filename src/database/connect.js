import Mongoose from 'mongoose';
import Database from '../config/database';

import UsersModel from '../app/models/User';
import GroupsModel from '../app/models/Group';

// models
const models = [UsersModel, GroupsModel];

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
