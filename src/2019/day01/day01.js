/* eslint-disable import/prefer-default-export */
import { readInput } from '../../helpers/file.js';

const filepath = new URL('input.txt', import.meta.url).pathname;

const getFuelAmount = (mass) => Math.floor(parseInt(mass) / 3) - 2;

export const day01 = async () => {
  const input = await readInput(filepath);

  const part1 = input.reduce((acc, mass) => acc + getFuelAmount(mass), 0);

  const part2 = input.reduce((acc, mass) => {
    let totalFuelForModule = 0;
    let fuel = getFuelAmount(mass);
    totalFuelForModule += fuel;

    while (fuel > 0) {
      fuel = getFuelAmount(fuel);
      if (fuel > 0) {
        totalFuelForModule += fuel;
      }
    }

    return acc + totalFuelForModule;
  }, 0);

  return {
    part1,
    part2,
  };
};
