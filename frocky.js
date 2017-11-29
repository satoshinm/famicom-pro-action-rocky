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

function decode(encoded) {
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

module.exports = { decode };
