import { day01 } from './day01/day01.js';
import { day02 } from './day02/day02.js';
import { day03 } from './day03/day03.js';

const loggerStart = (label) => {
  console.group(label);
  console.time(label);
};

const loggerEnd = (label, result) => {
  console.log('%s', result);
  console.timeEnd(label);
  console.groupEnd();
};

const launch = async (call, label) => {
  loggerStart(label);
  const result = await call();
  loggerEnd(label, result);
};

const aoc = async () => {
  await launch(day01, 'Day 01');
  await launch(day02, 'Day 02');
  await launch(day03, 'Day 03');
};

aoc();
