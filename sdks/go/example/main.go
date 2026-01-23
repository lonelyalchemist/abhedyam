package main

import (
	"fmt"
	sdk "abhedya-sdk"
)

func main() {
	fmt.Println("--- Testing Abhedya Go SDK ---")

	// 1. KeyGen
	fmt.Println("Generating Keys...")
	kp, err := sdk.KeyGen()
	if err != nil {
		panic(err)
	}
	fmt.Printf("KeyGen Success. PK Size: %d, SK Size: %d\n", len(kp.PublicKey), len(kp.SecretKey))

	// 2. Encrypt
	msg := []byte("Hello from Go!")
	fmt.Printf("Encrypting message: %s\n", msg)
	ct, err := sdk.Encrypt(kp.PublicKey, msg, sdk.Standard)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Encryption Success. CT Size: %d\n", len(ct))

	// 3. Decrypt
	fmt.Println("Decrypting...")
	decrypted, err := sdk.Decrypt(kp.SecretKey, ct)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Decrypted: %s\n", decrypted)

	// Check
    // Go slices are easy to compare
    match := true
    if len(decrypted) < len(msg) {
        match = false
    } else {
        for i := range msg {
            if decrypted[i] != msg[i] {
                match = false
                break
            }
        }
    }

	if match {
		fmt.Println("PASS: Decrypted message matches original.")
	} else {
		fmt.Println("FAIL: Mismatch.")
	}
}
