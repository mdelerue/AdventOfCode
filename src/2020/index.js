import { day01 } from './day01/day01.js';


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
  await launch(day01, '2020 - Day 01');
};

aoc();
