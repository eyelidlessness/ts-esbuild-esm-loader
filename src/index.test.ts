import it from 'ava';

it('fails', (test) => {
  test.assert(false, 'Start here.');
});

it('is run as ESM', (test) => {
  test.assert(typeof import.meta.url === 'string');
});
