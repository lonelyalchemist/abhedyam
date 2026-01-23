import sys
import os

# Ensure we can import abhedya from current directory
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from abhedya import Abhedya, EncryptionMode

def test_abhedya():
    print("--- Testing Abhedya Python SDK ---")
    
    # 1. Initialize
    try:
        # We need to point to the release build we just made
        # Root is /Users/pkpro/abhedya
        # Lib is target/release/libabhedya_ffi.dylib (or .so)
        # Verify extension
        if sys.platform == "darwin":
            lib_path = "../../target/release/libabhedya_ffi.dylib"
        else:
            lib_path = "../../target/release/libabhedya_ffi.so"
            
        # Convert to absolute
        lib_path = os.path.abspath(os.path.join(os.path.dirname(__file__), lib_path))
        print(f"Loading library from: {lib_path}")
        
        crypto = Abhedya(lib_path)
        print("Library loaded successfully.")
    except Exception as e:
        print(f"FAILED to load library: {e}")
        return

    # 2. KeyGen
    try:
        print("Generating Keys...")
        pk, sk = crypto.keygen()
        print(f"KeyGen Success. PK Size: {len(pk)}, SK Size: {len(sk)}")
        assert len(pk) == (768 * 768 + 768) * 2
        assert len(sk) == 768 * 2
    except Exception as e:
        print(f"KeyGen FAILED: {e}")
        return

    # 3. Encrypt
    msg = b"Hello, Abhedya!"
    try:
        print(f"Encrypting message: {msg}")
        ct = crypto.encrypt(pk, msg, mode=EncryptionMode.STANDARD)
        print(f"Encryption Success. Ciphertext Size: {len(ct)}")
    except Exception as e:
        print(f"Encryption FAILED: {e}")
        return

    # 4. Decrypt
    try:
        print("Decrypting...")
        decrypted = crypto.decrypt(sk, ct)
        print(f"Decrypted: {decrypted}")
        
        # Trim null bytes (if any) or just match content
        # Our decryptor decodes bits to bytes. Original message might be null terminated or not.
        # Just check if it starts with our message
        if decrypted.startswith(msg):
             print("PASS: Decrypted message matches original.")
        else:
             print(f"FAIL: Decrypted message mismatch. Got: {decrypted}")

    except Exception as e:
        print(f"Decryption FAILED: {e}")
        return

if __name__ == "__main__":
    test_abhedya()
