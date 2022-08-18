import { Router } from "express";

import Cors from "./app/middlewares/cors";
import Auth from "./app/middlewares/auth";
import Sessions from './app/controllers/sessions';

import Users from "./app/controllers/users/users";
import Groups from './app/controllers/groups/groups';
const routes = new Router();

routes.use(Cors);
routes.use((req, res, next) => Cors(req, res, next));

routes.post('/users', Users.create)

routes.post('/auth', Sessions.auth)
routes.post('/auth/refresh', Users.checkToken)

routes.get('/groups', Groups.get)
routes.post('/groups', Groups.create)

routes.get('/chats/:_id', Groups.getChat)

export default routes;
