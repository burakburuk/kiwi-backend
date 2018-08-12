import mongoose from 'mongoose';

const connectToDb = (success, error) => {
    mongoose.connect('mongodb://127.0.0.1:27017/kiwidb', {useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        success();
    });
};

export default connectToDb;