import { Groups } from '../../models/Group';

class Controller {

    async create(req, res) {

        try {
            const { name, description, image, tags, users } = req.body;

            const newGroup = { name, description, image, tags, users };

            var group = new Groups(newGroup);
            group.save();

            res.status(201).json({ ok: true });
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }

    async addUser(req, res) {

        try {
            const { userId, groupId } = req.body;

            await Groups.updateOne({ _id: groupId }, { $push: { users: userId } })

            res.status(201).json({ ok: true });
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }

    async get(req, res) {

        try {


            if (req.query.id) {
                const response = await Groups.find({ users: req.query.id });
                return res.status(200).json({ response });
            }

            if (req.query.name) {
                const response = await Groups.find({ name: { $regex: req.query.name } });
                return res.status(200).json({ response });
            }

            if (req.query.tag) {
                const response = await Groups.find({ tags: { $regex: req.query.tag } });
                return res.status(200).json({ response });
            }

            const response = await Groups.find();
            res.status(200).json({ response });

        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }

    async getChat(req, res) {
        try {

            const { _id } = req.params;

            if (!_id) {
                throw '_id is necessary'
            }

            const response = await Groups.findOne({ _id: _id }, { timeline: 1, avatar: 1, name: 1 });
            res.status(200).json({ response });

        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e });
        }
    }
}

export default new Controller();
