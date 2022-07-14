class Database {
    constructor() {
        return {
            url: `mongodb://localhost:27017/${process.env.DB_NAME}`,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        };
    }
}

export default new Database();
