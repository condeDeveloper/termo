// Constantes
const WORD_LEN = 5;
const MAX_TRIES = 6;
const FLIP_DELAY = 220;       // ms entre cada letra virar
const STATS_KEY = 'termo-stats';
const DAILY_KEY = 'termo-daily';
const EPOCH = new Date(2026, 0, 1); // dia 1 da palavra do dia

const KEY_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'],
];
