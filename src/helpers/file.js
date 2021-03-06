/* eslint-disable import/prefer-default-export */
import fs from 'fs';

export const readInput = (filePath, delimiter = '\n') =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.split(delimiter));
    });
  });
