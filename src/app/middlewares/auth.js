import jwt from 'jsonwebtoken';
import Auth from '../../config/auth';
import { promisify } from 'util';

import { Users } from '../models/User';

export default async (req, res, next) => {
    try {

        const token = req.headers.token
        const decode = await promisify(jwt.verify)(token, process.env.SECRET_AUTH);

        req.userAuth = decode._id;
        req.token = req.headers.authorization;

        let usuario = await Users.findOne({ _id: req.userAuth })

        if (usuario) {
            return next();
        }

        /* AUTH ADMIN */
        // if (
        //     req._parsedUrl.pathname.indexOf('/admin/') != -1 &&
        //     await Admin.findOne({ _id: req.userAuth })
        // ) {
        //     return next();
        // }

        /* AUTH CLIENTES */
        // if (
        //     (
        //         req._parsedUrl.pathname.indexOf('/clientes/') != -1 ||
        //         req._parsedUrl.pathname.indexOf('/cliente/') != -1
        //     ) && await Clientes.findOne({ _id: req.userAuth })
        // ) {
        //     return next();
        // }

        /* AUTH USUARIOS */
        // if (
        //     (
        //         req._parsedUrl.pathname.indexOf('/usuarios/') != -1 ||
        //         req._parsedUrl.pathname.indexOf('/usuario/') != -1
        //     ) && await Clientes.findOne({ _id: req.userAuth })
        // ) {
        //     return next();
        // }

        throw 'last unauthorized';
    } catch (e) {
        console.log('invalid auth => ', e);
        return res.status(403).json({ error: 'unauthorized' });
    }
};
