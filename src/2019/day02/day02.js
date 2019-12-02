/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const WANTED_RESULT = 19690720;
const NOUN_POSSIBILITIES = 99;
const VERB_POSSIBILITIES = 99;

const filepath = new URL('input.txt', import.meta.url).pathname;

export const day02 = async () => {
  const input = await readInput(filepath, ',');
  let processed = input.map((value) => parseInt(value));
  processed[1] = 12;
  processed[2] = 2;

  const [part1] = processPart(processed, processed.slice(0, 4), 4);
  const nouns = Array.from(Array(NOUN_POSSIBILITIES).keys());
  const verbs = Array.from(Array(VERB_POSSIBILITIES).keys());
  let part2 = null;

  for (const noun of nouns) {
    for (const verb of verbs) {
      processed = input.map((value) => parseInt(value));
      processed[1] = noun;
      processed[2] = verb;

      const [result] = processPart(processed, processed.slice(0, 4), 4);

      if (result === WANTED_RESULT) {
        part2 = parseInt(('0' + noun).slice(-2) + ('0' + verb).slice(-2));
        break;
      }
    }
  }

  return {
    part1,
    part2,
  };
};

const processPart = (array, part, nextIndex) => {
  if (part[0] === 99) {
    return array;
  }

  switch (part[0]) {
    case 1:
      array[part[3]] = array[part[1]] + array[part[2]];
      break;
    case 2:
      array[part[3]] = array[part[1]] * array[part[2]];
      break;
  }

  return processPart(
    array,
    array.slice(nextIndex, nextIndex + 4),
    nextIndex + 4
  );
};
