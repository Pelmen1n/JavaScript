const countVowels = (word) => {
    return [...word.toLowerCase()].filter(char => ['a','e','i','o','u'].includes(char)).length;
}; 


const word = "JavaScript";
const vowelCount = countVowels(word);
console.log(vowelCount);