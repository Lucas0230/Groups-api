import { Groups } from '../models/Group';

class Messages {

    async store(groupId, userId, message, time) {

        await Groups.updateOne({ _id: groupId }, {
            $push: {
                timeline: { message: message, userId: userId, time: time ? time : new Date() }
            }
        })
    }

}


export default new Messages();