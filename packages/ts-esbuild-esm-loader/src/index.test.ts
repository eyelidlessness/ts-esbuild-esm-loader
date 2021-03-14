import { test as it } from 'uvu';
import * as assert    from 'uvu/assert'

it('fails', () => {
  // assert.ok(false, 'Start here.');
  assert.ok('welp')
});

it('is run as ESM', () => {
  assert.ok(typeof module === 'undefined', 'module is defined.');
  assert.ok(typeof require === 'undefined', 'Require is defined.');
  assert.ok(typeof import.meta.url === 'string', 'Not ESM.');
});

it.run();
