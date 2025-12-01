// define a function that takes a string
// convert them like "hello" => "Hello"
const capitalize = (string) => {
  // isolate the first character
  const firstCharacter = string[0];
  // use to upper case to make it caps
  const firstCharacterUppercased = firstCharacter.toUpperCase();

  // isolate the rest of the word
  const restOfTheWord = string.substr(1);
  // use to lower case to make it lower
  const restOfTheWordLowerCased = restOfTheWord.toLowerCase();
  // interpolate both and return
  return `${firstCharacterUppercased}${restOfTheWordLowerCased}`;
};

console.log(capitalize("hello"));
console.log(capitalize("World"));
console.log(capitalize("coding"));
console.log(capitalize("coDINg"));
