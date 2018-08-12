import Word from '../models/word';

const removePreviousData = () => {
    Word.remove((err) => {
        if (err) throw err;

        console.log('All data Successfully deleted!');
    });
};

const createWords = (list) => {
    const wordList = list.map(item => {
        return new Word({
            key: item.key,
            words: item.words
        });
    });
    console.log("Data to be created: ");
    console.log(wordList);

    Word.insertMany(wordList).then((docs) => {
        console.log("Data insertion completed!");
    }).catch((err) => {
        console.log(err + " Data insertion failed!");
    });
};

const getWordsByKey = (key = 0) => {
    return Word.find({key: key}, (err, list) => {
        if (err) throw err;
        return list;
    }).then(response => {
        if (response.length > 0) {
            console.log(response[0].words);
            return response[0].words;
        } else {
            return [];
        }
    })
};

export {createWords, removePreviousData, getWordsByKey};