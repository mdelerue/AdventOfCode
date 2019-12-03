/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const filepath = new URL('input.txt', import.meta.url).pathname;

export const day03 = async () => {
  const [line1, line2] = (await readInput(filepath, '\n')).map((line) =>
    line.split(',')
  );

  const fullCoordLine1 = getDotCoordinate(line1);
  const fullCoordLine2 = getDotCoordinate(line2);
  const line1Dots = dedupe(fullCoordLine1.map(({ x, y }) => `${x}_${y}`));
  const line2Dots = dedupe(fullCoordLine2.map(({ x, y }) => `${x}_${y}`));

  const intersection = intersect(line1Dots, line2Dots);

  const part1 = intersection
    .map((item) => generateDotFromStringCoord(item))
    .reduce((result, current) => {
      if (!result || Math.abs(current.x) + Math.abs(current.y) < result) {
        return Math.abs(current.x) + Math.abs(current.y);
      }
      return result;
    }, null);

  const part2 = intersection
    .map((item) => generateDotFromStringCoord(item))
    .reduce((result, current) => {
      const delay =
        fullCoordLine1.find((dot) => dot.x === current.x && dot.y === current.y)
          .numberOfMove +
        fullCoordLine2.find((dot) => dot.x === current.x && dot.y === current.y)
          .numberOfMove;
      return !result || delay < result ? delay : result;
    }, null);

  return {
    part1,
    part2,
  };
};

const getDotCoordinate = (line) =>
  // let's assume that the start line is at coordinate (0,0)
  line.reduce((fullArray, instruction) => {
    const numberOfMovement = parseInt(instruction.slice(1));
    const start = fullArray.length
      ? fullArray.slice(-1)[0]
      : { x: 0, y: 0, numberOfMove: 0 };
    const movements = Array.from(Array(numberOfMovement).keys()).map(
      (key) => key + 1
    );
    let partialMoves = [];

    switch (instruction[0]) {
      case 'D':
        partialMoves = movements.reduce(
          (acc, value) => [
            ...acc,
            {
              ...start,
              y: start.y - value,
              numberOfMove: start.numberOfMove + value,
            },
          ],
          []
        );
        break;
      case 'U':
        partialMoves = movements.reduce(
          (acc, value) => [
            ...acc,
            {
              ...start,
              y: start.y + value,
              numberOfMove: start.numberOfMove + value,
            },
          ],
          []
        );
        break;
      case 'L':
        partialMoves = movements.reduce(
          (acc, value) => [
            ...acc,
            {
              ...start,
              x: start.x - value,
              numberOfMove: start.numberOfMove + value,
            },
          ],
          []
        );
        break;
      case 'R':
        partialMoves = movements.reduce(
          (acc, value) => [
            ...acc,
            {
              ...start,
              x: start.x + value,
              numberOfMove: start.numberOfMove + value,
            },
          ],
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

const generateDotFromStringCoord = (item) => ({
  x: parseInt(item.split('_')[0]),
  y: parseInt(item.split('_')[1]),
});
