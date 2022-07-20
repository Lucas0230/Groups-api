import { Users } from '../models/User';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Auth from '../../config/auth';

import jwt from 'jsonwebtoken';

const GetUser = async (email) => {

    try {
        return await Users.findOne({ email: email, archive: false, status: true });

    } catch (e) {
        console.log(e)
        return
    }

    return false;
}


class SessionController {

    async auth(req, res) {

        try {

            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'required-data' });
            }

            const user = await GetUser(email);

            if (!user) {
                return res.status(400).json({ error: 'invalid-user' });
            }

            if (user.status == false) {
                return res.status(400).json({ error: 'user-status-false' });
            }
            if (!(await bcryptjs.compare(password, user.password))) {
                return res.status(400).json({ error: 'invalid-password' });
            }

            const token = await jwt.sign({ _id: user._id }, process.env.SECRET_AUTH, {
                expiresIn: process.env.EXPIRE_AUTH
            });

            res.status(200).json({ token });

        } catch (e) {
            console.log(e)
            res.status(400).json({ error: e });
        }

    }

}

export default new SessionController();
