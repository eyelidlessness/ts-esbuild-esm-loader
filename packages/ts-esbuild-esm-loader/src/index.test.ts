import it from 'ava';

it('runs as an ESM module', (assert) => {
  assert.true(typeof import.meta.url === 'string');
});
