import { Users } from '../../models/User';

import bcrypt from 'bcrypt';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

class Controller {

    async get(req, res) {

        try {
            const { id } = req.params;

            let users = await Users.findOne({ _id: id }, { name: 1 })

            res.status(201).json({ users });

        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }



    async create(req, res) {

        try {
            const { name, email, cpf, password, phone, age, about, choices } = req.body;

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hashSync(password, salt);

            const newUser = { name, email, cpf, password: passwordHash, phone, age, about, choices };

            var user = new Users(newUser);
            user.save();

            res.status(201).json({ ok: true });
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }

    async checkToken(req, res) {
        try {

            const { token } = req.body;
            const { _id } = await promisify(jwt.verify)(token, process.env.SECRET_AUTH);

            let user = await Users.findOne({ _id: _id });
            if (!user) {
                throw 'Invalid Token'
            }

            res.status(200).json({
                name: user.name, email: user.email, choices: user.choices, phone: user.phone
            })

        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }
}

export default new Controller();
