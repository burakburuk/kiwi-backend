let t9Map = new Map();
t9Map.set("*", ["*"]);
t9Map.set("#", ["#"]);
t9Map.set("0", ["0"]);
t9Map.set("1", [".", ",", "!"]);
t9Map.set("2", ["a", "b", "c"]);
t9Map.set("3", ["d", "e", "f"]);
t9Map.set("4", ["g", "h", "i"]);
t9Map.set("5", ["j", "k", "l"]);
t9Map.set("6", ["m", "n", "o"]);
t9Map.set("7", ["p", "q", "r", "s"]);
t9Map.set("8", ["t", "u", "v"]);
t9Map.set("9", ["w", "x", "y", "z"]);

const convertNumbersToT9 = (numbers) => {
    let result = [];
    let lettersList = [];
    for (let i = 0; i < numbers.length; i++) {
        const selectedNumber = numbers.charAt(i);
        lettersList.push(t9Map.get(selectedNumber));
    }

    for (let i = 0; i < lettersList.length - 1; i++) {
        const keyWords = lettersList[i];
        for (let j = 0; j < keyWords.length; j++) {
            const letter = keyWords[j]; // 'a';
            const afterWords = lettersList[i + 1];

            for (let k = 0; k < afterWords.length; k++) {
                result.push(letter + afterWords[k]);
            }
        }
    }
    return result;
};

export {convertNumbersToT9};
