/**
 * simplejsonconf
 *
 * A simple library to manage JSON as ex. a configuration file
 *
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @license MIT
 * @preserve
 */
const simplejsonconf = require('./index.js');

const obj = {
  a: 1,
  b: {
    c: 2,
    d: [1, 2, 3],
    e: {f: 'jazz'}
  }
};

test('simplejsonconf()', () => {
  const s = simplejsonconf(obj);
  expect(s.get()).toEqual(obj);
});

test('#get()', () => {
  const s = simplejsonconf(obj);
  expect(s.get('a')).toEqual(1);
  expect(s.get('b.c')).toEqual(2);
  expect(s.get('b.d')).toEqual(obj.b.d);
  expect(s.get('b.e')).toEqual(obj.b.e);

  // TODO: Default value
  // TODO: Non-existing key path
});

test('#remove', () => {
  const s = simplejsonconf(obj);
  s.remove('a');
  s.remove('b.c');
  s.remove('b.d.0');

  expect(s.get('a')).toEqual(undefined);
  expect(s.get('b.c')).toEqual(undefined);
  expect(s.get('b.d')).toEqual([2, 3]);
});

test('#push', () => {
  const s = simplejsonconf(obj);
  s.push('b.d', 4);
  expect(s.get('b.d')).toEqual([1, 2, 3, 4]);

  // TODO: Non-array
});

test('#set', () => {
  const s = simplejsonconf(obj);

  s.set('b.e', {
    g: 'bass'
  })

  expect(s.get('b.e')).toEqual({
    f: 'jazz',
    g: 'bass'
  });

  s.set('b.c', 3);
  expect(s.get('b.c')).toEqual(3);

  s.set('a', 2);
  expect(s.get('a')).toEqual(2);

  s.set('unknown1.unknown2.unknown3', 'data');
  expect(s.get('unknown1.unknown2.unknown3')).toEqual('data');
});

test('#reset', () => {
  const s = simplejsonconf(obj);
  s.reset();
  expect(s.get()).toEqual(obj);

  const no = {foo: 'bar'};
  s.reset(no);
  expect(s.get()).toEqual(no);
});

test('#toString', () => {
  const s = simplejsonconf(obj);
  expect(s.toString()).toBe(JSON.stringify(obj));
});
