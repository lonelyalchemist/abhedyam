# Abhedya Node.js SDK

To use Abhedya in Node.js, use the `ffi-napi` library to bind to the native shared object.

## Implementation Guide

```javascript
const ffi = require("ffi-napi");
const path = require("path");

const libPath = path.join(__dirname, "../native/lib/libabhedya_ffi");

const abhedya = ffi.Library(libPath, {
  abhedya_keygen: ["int", ["pointer", "pointer", "pointer", "pointer"]],
  abhedya_encrypt_verse: [
    "int",
    ["pointer", "string", "int", "pointer", "pointer"],
  ],
});

module.exports = abhedya;
```
