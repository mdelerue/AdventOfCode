/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const filepath = new URL('input.txt', import.meta.url).pathname;

let output = [];
const map = Array.prototype.map;

export const day06 = async () => {
  const input = await readInput(filepath, '\n');

  return {
    part1: null,
    part2: null,
  };
};
