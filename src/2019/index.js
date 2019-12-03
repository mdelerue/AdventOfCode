import { day01 } from './day01/day01.js';
import { day02 } from './day02/day02.js';
import { day03 } from './day03/day03.js';

const aoc = async () => {
  const day01Result = await day01();
  console.log('Day 1 : ');
  console.log(day01Result);

  const day02Result = await day02();
  console.log('Day 2 : ');
  console.log(day02Result);

  const day03Result = await day03();
  console.log('Day 3 : ');
  console.log(day03Result);
};

aoc();
