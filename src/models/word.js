import mongoose from 'mongoose';

// create a schema
const wordSchema = new mongoose.Schema({
    key: Number,
    words: Array
});

// the schema is useless so far
// we need to create a model using it
const Word = mongoose.model('Word', wordSchema);

// make this available to our users in our Node applications
export default Word;