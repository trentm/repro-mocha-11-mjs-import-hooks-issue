import assert from 'assert';
import { readFileSync } from 'fs';

const LOG_FILE = './hook.log';

describe('when running this .mjs test file', function () {
  it('should run the hook.mjs loader on this file', async function () {
    const logMsgs = readFileSync(LOG_FILE, 'utf8');
    assert.ok(logMsgs.includes('repro.test.mjs'));
  });
});
