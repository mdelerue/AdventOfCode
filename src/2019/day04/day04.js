/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const filepath = new URL('input.txt', import.meta.url).pathname;

export const day04 = async () => {
  const [min, max] = (await readInput(filepath, '-')).map((limit) =>
    parseInt(limit)
  );

  let possibilitiesPart1 = [];
  let possibilitiesPart2 = [];
  for (let num = min; num <= max; num++) {
    const value = num.toString();
    if (value.match(/\d{6}/) && value.match(/(.)\1/)) {
      const validPassword = checkPasswdOrdering(value);
      if (validPassword) {
        possibilitiesPart1 = [...possibilitiesPart1, value];

        // I didn't write this regex. Actually it comes
        // from https://github.com/vuryss/aoc-2019/blob/master/day-4.js
        if (value.match(/(?:(?:(\d?)(?!\1))|^)(\d)\2(?!\2)/)) {
          possibilitiesPart2 = [...possibilitiesPart2, value];
        }
      }
    }
  }
  return {
    part1: possibilitiesPart1.length,
    part2: possibilitiesPart2.length,
  };
};

const checkPasswdOrdering = (password) =>
  Array.prototype.map
    .call(password, (char) => parseInt(char))
    .reduce((isOk, digit, index, array) => {
      return isOk && (index === 0 || (index > 0 && digit >= array[index - 1]));
    }, true);
