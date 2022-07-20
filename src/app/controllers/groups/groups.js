import { Groups } from '../../models/Group';

class Controller {

    async create(req, res) {

        try {
            const { name, description, image, tags } = req.body;

            const newGroup = { name, description, image, tags };

            var group = new Groups(newGroup);
            group.save();

            res.status(201).json({ ok: true });
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }
    async get(req, res) {

        try {

            const response = await Groups.find();
            res.status(200).json({ response });

        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }
}

export default new Controller();
