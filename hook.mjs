// A mimimal Node.js loader hook (to be used with `--experimental-loader=./hook.mjs`),
// that notes which URLs its `load()`-hook has been called on.
import { appendFileSync, writeFileSync } from 'node:fs';

const LOG_FILE = './hook.log';

export async function initialize() {
  writeFileSync(LOG_FILE, '[' + new Date().toISOString() + '] initialize\n');
}

export async function load(url, context, next) {
  appendFileSync(LOG_FILE, 'hook url=' + url + '\n');
  return next(url);
}
