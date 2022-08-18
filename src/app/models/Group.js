class GroupsModel {
    constructor() {
        this.model = null;
    }

    init(db) {
        this.model = db.model('groups', {

            name: String,
            description: String,
            image: String,
            tags: Array,
            avatar: { type: String, default: 'https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png' },


            users: Array,
            timeline: Array,

            status: { type: Boolean, default: true },
            archive: { type: Boolean, default: false },

            createAt: { type: Date, default: Date.now },
            lastUpdate: { type: Date, default: Date.now }
        });
    }

    get() {
        return this.model;
    }
}

const groups = new GroupsModel();

export default groups;

const start = () => {
    setTimeout(() => {
        if (!groups.get()) {
            return start();
        }

        export const Groups = groups.get();
    }, 500);
};

start();
