import { Router } from "express";

import Cors from "./app/middlewares/cors";
import Auth from "./app/middlewares/auth";
import Sessions from './app/controllers/sessions';

import Users from "./app/controllers/users/users";
const routes = new Router();

routes.use(Cors);
routes.use((req, res, next) => Cors(req, res, next));


routes.post('/users', Users.create)

routes.post('/auth', Sessions.auth)

export default routes;
