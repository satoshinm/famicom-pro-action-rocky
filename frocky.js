'use strict';

// Snippets based on http://www.chrismcovell.com/CheatConverter.html - credit:
// "You may use snippits of this code in any program you want, if it is the game genie or pro action rockey decode or encode. Include this file with the program or put a thanks to Blue Hawk and this script title.
// Coded by Blue Hawk."

// Bit descrambling arrays
const rocky_shifts = [
	3,13,14,1,6,9,5,0,12,7,2,8,10,11,4,	// addr
	19,21,23,22,20,17,16,18,		// compare
	29,31,24,26,25,30,27,28			// replace
];


const rocky_key = 0x7e5ee93a;
const rocky_xor = 0x5c184b91;

function decode(s) {
  let encoded = parseInt(s, 16);
  encoded >>= 1;
  let key = rocky_key;
  let decoded = 0;
  let i = 31;
  while (i--) {
    if ((key ^ encoded) & 0x40000000) {
      decoded |= 1 << rocky_shifts[i];
      key ^= rocky_xor;
    }

    encoded <<= 1;
    key <<= 1;
  }

  const address = (decoded & 0x7fff);
  const compare = (decoded >> 16) & 0xff;
  const value   = (decoded >> 24) & 0xff;

  return { address, key: compare, value };
}

function toHex(n, width) {
  const s = n.toString(16);
  return '00000000'.substring(0, width - s.length) + s;
}

function encode(address, value, compare)
{
  if (compare === undefined || compare === null) return null;

  let decoded = address & 0x7fff;
  decoded |= compare << 16;
  decoded |= value << 24;

  let key = rocky_key;
  let encoded = new Uint32Array(1);
  let i = 31;
  while (i--) {
    const bit = decoded >> rocky_shifts[i];

    if (((key >> 30) ^ bit) & 1) {
      encoded[0] |= 2 << i;
    }

    if (bit & 1) {
      key ^= rocky_xor;
    }

    key <<= 1;
  }

  return toHex(encoded[0], 8).toUpperCase();
}

module.exports = { decode, encode };
