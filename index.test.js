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
  expect(s.get('b.e', 'ignored')).toEqual(obj.b.e);
  expect(s.get('c', 'not-ignored')).toEqual('not-ignored');
  expect(s.get('d')).toEqual(undefined);
  expect(s.get('d', 'not-ignored')).toEqual('not-ignored');
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

  expect(() => s.push('x', 1)).toThrow('array');
  expect(() => s.push('a', 1)).toThrow('array');
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

  const empty = {empty: 'now'};
  s.set('a', empty, {
    merge: false
  });

  expect(s.get('a')).toEqual(empty);

  const tst = {foo: 'bar'};
  s.set('parsetest', JSON.stringify(tst));
  expect(s.get('parsetest')).toEqual(tst);

  s.reset();
  s.set(null, {
    'nokey': 'yes'
  });

  expect(s.get('nokey')).toEqual('yes');
  expect(s.get('a')).toEqual(1);
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
