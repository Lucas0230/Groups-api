class UsersModel {
    constructor() {
        this.model = null;
    }

    init(db) {
        this.model = db.model('users', {

            name: String,
            cpf: String,
            email: String,
            password: String,
            phone: String,
            age: Number,
            about: String,
            choices: Array,

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

const users = new UsersModel();

export default users;

const start = () => {
    setTimeout(() => {
        if (!users.get()) {
            return start();
        }

        export const Users = users.get();
    }, 500);
};

start();
