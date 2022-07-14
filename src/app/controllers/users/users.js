import { Users } from '../../models/User';

import bcrypt from 'bcrypt'

class Controller {

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
}

export default new Controller();
