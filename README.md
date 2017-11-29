# famicom-pro-action-rocky

Nintendo Famicom Pro Action Rocky decoder/encoder (npmjs module)

The Rocky is a device similar to the Game Genie (see also related module:
[nes-game-genie](https://github.com/satoshinm/nes-game-genie)), but it always
includes a compare value and uses a different encoding format.

Largely based on [http://www.chrismcovell.com/CheatConverter.html](http://www.chrismcovell.com/CheatConverter.html), credit to
Blue Hawk, Chris Covell, Jamethiel, ReaperSMS, Quietust, blargg, and others
who have helped decode this format and write the initial encoding/decoding
implementations.

Example:

    const { decode, encode } = require('famicom-pro-action-rocky');

    console.log(decode(0xfcbdd274)); // { address: 0x0000, key: 0x00, value: 0x00 }
    console.log(decode(0x00000000)); // { address: 0x65da, key: 0xd4, value: 0x3f }

    console.log(encode(0x0000, 0x00, 0x00)); // 0xfcbdd274
    console.log(encode(0x65da, 0x3f, 0xd4)); // 0x00000000

## License

MIT
