This demonstrates an issue with the changes in mocha@11.7.0
and using mocha to run a test with the following conditions:

1. mocha v11.7.0 or v11.7.1 is used,
2. node v20.19.x is used,
3. the test file uses the .mjs extension to indicate to node that it should be run as an ES module, and *not* as a CommonJS module, and
4. the test relies on a Node.js custom module loader being run for the test file. A custom module loader can, for example, be specified for now via `--experimental-loader ./my-loader.mjs` (https://nodejs.org/api/all.html#all_cli_--experimental-loadermodule).

To run the repro:

```
% npm install
...

% npm test

> repro-mocha-11-mjs-issue@1.0.0 test
> NODE_NO_WARNINGS=1 node --experimental-loader=./hook.mjs ./node_modules/.bin/mocha 'test/**/*.test.mjs'



  when running this .mjs test file
    1) should run the hook.mjs loader on this file


  0 passing (4ms)
  1 failing

  1) when running this .mjs test file
       should run the hook.mjs loader on this file:

      AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

  assert.ok(logMsgs.includes('repro.test.mjs'))

      + expected - actual

      -false
      +true

      at Context.<anonymous> (file:///Users/trentm/tm/repro-mocha-11-mjs-import-hooks-issue/test/repro.test.mjs:9:12)
      at process.processImmediate (node:internal/timers:483:21)
```

If you install an earlier version of mocha@11, the test passes:

```
% npm install --no-save mocha@11.6.0

% npm test

> repro-mocha-11-mjs-issue@1.0.0 test
> NODE_NO_WARNINGS=1 node --experimental-loader=./hook.mjs ./node_modules/.bin/mocha 'test/**/*.test.mjs'



  when running this .mjs test file
    ✔ should run the hook.mjs loader on this file


  1 passing (1ms)

```

The issue explains what is happening.
TODO: link to the issue.

