/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const filepath = new URL('input.txt', import.meta.url).pathname;

let output = [];
const map = Array.prototype.map;

export const day05 = async () => {
  const input = await readInput(filepath, ',');
  let processed = input.map((value) => parseInt(value));

  processPart(processed, 0);

  return {
    part1: output.slice(-1)[0],
  };
};

const processPart = (array, nextStartIndex) => {

  if (array[nextStartIndex].toString().padStart(5, '0') === '00099') {
    return output;
  }

  const instruction = map
    .call(array[nextStartIndex].toString().padStart(5, '0'), (letter) => parseInt(letter))
    .reverse();

  switch (instruction[0]) {
    case 1:
      array[array[nextStartIndex + 3]] =
        processOperand(1, array, nextStartIndex, instruction) +
        processOperand(2, array, nextStartIndex, instruction);
      nextStartIndex +=  4;
      break;
    case 2:
      array[array[nextStartIndex + 3]] =
        processOperand(1, array, nextStartIndex, instruction) *
        processOperand(2, array, nextStartIndex, instruction);
      nextStartIndex += 4;
      break;
    case 3:
      array[array[nextStartIndex + 1]] = 1;
      nextStartIndex += 2;
      break
    case 4:
      output = [...output, array[array[nextStartIndex + 1]]];
      nextStartIndex += 2;
      break;
  }

  return processPart(array, nextStartIndex);
};

const processOperand = (operandNumber, fullInput, index, instruction) =>
  instruction[1 + operandNumber] === 0
    ? fullInput[fullInput[index + operandNumber]]
    : fullInput[index + operandNumber];
