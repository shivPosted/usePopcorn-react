export const API_key = import.meta.env.VITE_API_key;

export const average = (arr) =>
  arr.reduce((accum, cur) => accum + cur) / arr.length;
