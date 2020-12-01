/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const filepath = new URL('input.txt', import.meta.url).pathname;



export const day01 = async () => {
  const input = await readInput(filepath);

  let part1 = 0, part2 = 0;

  for (const first of input) {
    const secondVal = input.find((second) => Number(second)  + Number(first) === 2020)
    if (secondVal) {
        part1 = Number(first) * Number(secondVal);
        break;
    }
  }

  for (const first of input) {
    for (const second of input) {
        const thirdVal = input.find((third) => Number(first)  + Number(second) + Number(third) === 2020)
        if (thirdVal) {
            part2 = Number(first) * Number(second) * Number(thirdVal);
            break;
        }
    }
  }

  return {
    part1,
    part2,
  };
};
