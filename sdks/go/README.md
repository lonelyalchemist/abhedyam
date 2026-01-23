# Abhedya Go SDK

To use Abhedya in Go, use `cgo` to link against the native library.

## Implementation Guide

```go
package main

/*
#cgo LDFLAGS: -L../native/lib -labhedya_ffi
#include "../native/include/abhedya.h"
*/
import "C"
import "unsafe"

func KeyGen() {
    // Call C.abhedya_keygen(...)
}
```
