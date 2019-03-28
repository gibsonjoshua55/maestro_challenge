const Mongoose = require('mongoose');

module.exports = {
    setup: (testing) => {
        Mongoose.Promise = global.Promise;

        return new Promise((resolve, reject) => {
            Mongoose.connect(
                testing ? process.env.DB_TEST_HOST : process.env.DB_HOST,
                {
                    user: process.env.DB_USER,
                    pass: process.env.DB_PASSWORD,
                    useNewUrlParser: true,
                    useFindAndModify: false
                }
            ).then(() => {
                const TimestampCollectionsSchema = Mongoose.Schema({
                    id: Mongoose.Schema.Types.ObjectId,
                    title: String,
                    videoId: String,
                    timestamps: [{
                        id: Mongoose.Schema.Types.ObjectId, 
                        time: Number, 
                        title: String,
                        bpm: Number
                    }]
                });
                
                module.exports.TimestampCollections = Mongoose.model('timestamps', TimestampCollectionsSchema);
                module.exports.Mongoose = Mongoose;
                resolve();
            }, (err) => {
                reject(err);
            });
        });
    },
};
