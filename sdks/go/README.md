# Abhedya SDK for Go

**Sanskrit-Encoded Post-Quantum Cryptography**

Abhedya is a robust LWE-based cryptosystem that supports linguistic steganography. This module provides CGo bindings to the Abhedya Rust core.

## features

- **Lattice-Based Security**: Hardened LWE ($N=768$).
- **Zero-Copy Networking**: Efficient byte-slice interfaces.
- **Metered Encryption**: Support for Sanskrit-prosody compliant outputs.

## Installation

```bash
go get github.com/ParamTatva-org/abhedyam/sdks/go
```

## Usage

```go
package main

import (
	"fmt"
	"github.com/ParamTatva-org/abhedyam/sdks/go" // Alias as needed
)

func main() {
	// 1. Key Generation
	keys, err := abhedya.KeyGen()
	if err != nil {
		panic(err)
	}

	// 2. Encrypt
	msg := []byte("Post-Quantum Data")
	ciphertext, err := abhedya.Encrypt(
        keys.PublicKey,
        msg,
        abhedya.Standard,
    )

	// 3. Decrypt
	plaintext, err := abhedya.Decrypt(keys.SecretKey, ciphertext)

	fmt.Println("Decrypted:", string(plaintext))
}
```

## Prerequisites

- **CGO_ENABLED=1**
- `libabhedya_ffi` shared library must be available in your system library path (`/usr/lib`, `/usr/local/lib`) or `LD_LIBRARY_PATH`.

## License

MIT License.
