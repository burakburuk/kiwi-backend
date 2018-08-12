import {createWords, removePreviousData} from '../services/wordService';

const fs = require('fs');

const wordMap = new Map();
wordMap.set('abc', 2);
wordMap.set('def', 3);
wordMap.set('ghi', 4);
wordMap.set('rkl', 5);
wordMap.set('mno', 6);
wordMap.set('pqrs', 7);
wordMap.set('tuv', 8);
wordMap.set('wxyz', 9);

let wordsFromFile = [];

const getKeyFromWord = (word) => {
    let keys = "";
    console.log("Key Generation started for " + word);
    for (let i = 0; i < word.length; i++) {
        const c = word.charAt(i).toLowerCase();

        wordMap.forEach((value, key, map) => {
            if (key.indexOf(c) != -1) {
                keys += value;
            }
        });
    }
    return parseInt(keys);
};

const readWords = (path) => {
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(path)
    });

    lineReader.on('line', (word) => {
        const key = getKeyFromWord(word);
        let existIndex = wordsFromFile.findIndex(item => item.key === key);
        if (existIndex !== -1) {
            wordsFromFile[existIndex].words.push(word)
        } else {
            wordsFromFile.push({
                key: parseInt(key),
                words: [word]
            })
        }
    });

    lineReader.on('close', () => {
        readFromFileCompleted();
    });
};

const readFromFileCompleted = () => {
    console.log("File closed");
    console.log(wordsFromFile);

    createWords(wordsFromFile);
};

const wordCreator = () => {
    const path = __dirname + '/words_alpha_list.txt';
    fs.exists(path, (exists) => {
        if (exists) {
            removePreviousData();
            readWords(path);
        } else {
            console.log('File could not be found under ' + path);
        }
    });
};

export default wordCreator;