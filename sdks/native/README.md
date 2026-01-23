# Abhedya Native SDK (C/C++)

This directory contains the native interface bindings for Abhedya.

## Structure

- `include/abhedya.h`: C Header file.
- `lib/`: Shared libraries (`.dylib`, `.so`, `.dll`).

## Usage (C Example)

```c
#include "include/abhedya.h"
#include <stdio.h>

int main() {
    unsigned char pk[2048];
    size_t pk_len = 2048;
    // ...
    if (abhedya_keygen(pk, &pk_len, ...) == 0) {
        printf("Keys generated.\n");
    }
}
```
