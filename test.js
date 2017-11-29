'use strict';

const { decode, encode } = require('./');
const test = require('tape');

test('decode', (t) => {
  t.deepEqual(decode(0xfcbdd274), { address: 0x0000, key: 0x00, value: 0x00 });
  t.deepEqual(decode(0x00000000), { address: 0x65da, key: 0xd4, value: 0x3f });
  t.end();
});

test('encode', (t) => {
  t.equal(encode(0x0000, 0x00, 0x00), 0xfcbdd274);
  t.equal(encode(0x65da, 0x3f, 0xd4), 0x00000000);

  t.end();
});