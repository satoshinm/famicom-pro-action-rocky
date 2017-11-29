'use strict';

const { decodeRocky, encodeRocky } = require('./');
const test = require('tape');

test('decodeRocky', (t) => {
  t.deepEqual(decodeRocky('FCBDD274'), { address: 0x0000, key: 0x00, value: 0x00 });
  t.deepEqual(decodeRocky('00000000'), { address: 0x65da, key: 0xd4, value: 0x3f });
  t.end();
});

test('encodeRocky', (t) => {
  t.equal(encodeRocky(0x0000, 0x00, 0x00), 'FCBDD274');
  t.equal(encodeRocky(0x65da, 0x3f, 0xd4), '00000000');

  t.end();
});

test('invalid no compare', (t) => {
  t.equal(encodeRocky(0x0000, 0x00), null);
  t.end();
});
