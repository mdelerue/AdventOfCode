/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const filepath = new URL('input.txt', import.meta.url).pathname;

export const day03 = async () => {
  const [line1, line2] = (await readInput(filepath, '\n')).map((line) =>
    line.split(',')
  );

  const line1Dots = dedupe(
    getDotCoordinate(line1).map(({ x, y }) => `${x}_${y}`)
  );
  const line2Dots = dedupe(
    getDotCoordinate(line2).map(({ x, y }) => `${x}_${y}`)
  );

  const intersection = intersect(line1Dots, line2Dots);

  const part1 = intersection
    .map((item) => ({
      x: parseInt(item.split('_')[0]),
      y: parseInt(item.split('_')[1]),
    }))
    .reduce((result, current) => {
      if (!result || Math.abs(current.x) + Math.abs(current.y) < result) {
        return Math.abs(current.x) + Math.abs(current.y);
      }
      return result;
    }, null);

  return {
    part1,
  };
};

const getDotCoordinate = (line) =>
  // let's assume that the start line is at coordinate (0,0)
  line.reduce((fullArray, instruction) => {
    const numberOfMovement = parseInt(instruction.slice(1));
    const start = fullArray.length ? fullArray.slice(-1)[0] : { x: 0, y: 0 };
    const movements = Array.from(Array(numberOfMovement).keys()).map(
      (key) => key + 1
    );
    let partialMoves = [];

    switch (instruction[0]) {
      case 'D':
        partialMoves = movements.reduce(
          (acc, value) => [...acc, { ...start, y: start.y - value }],
          []
        );
        break;
      case 'U':
        partialMoves = movements.reduce(
          (acc, value) => [...acc, { ...start, y: start.y + value }],
          []
        );
        break;
      case 'L':
        partialMoves = movements.reduce(
          (acc, value) => [...acc, { ...start, x: start.x - value }],
          []
        );
        break;
      case 'R':
        partialMoves = movements.reduce(
          (acc, value) => [...acc, { ...start, x: start.x + value }],
          []
        );
        break;
    }

    return [...fullArray, ...partialMoves];
  }, []);

const dedupe = (array) => Array.from(new Set(array));

const intersect = (array1, array2) => {
  var set2 = new Set(array2);
  return [...new Set(array1)].filter((x) => set2.has(x));
};
