import ctypes
import os
import sys
from enum import IntEnum

# Load library
lib_name = "libabhedya_ffi.dylib"
if sys.platform == "linux":
    lib_name = "libabhedya_ffi.so"
elif sys.platform == "win32":
    lib_name = "abhedya_ffi.dll"

# Path to lib relative to this file
lib_path = os.path.join(os.path.dirname(__file__), "..", "native", "lib", lib_name)
try:
    _lib = ctypes.CDLL(lib_path)
except OSError:
    print(f"Error: Could not load Abhedya Shared Library at {lib_path}")
    sys.exit(1)

class EncryptionMode(IntEnum):
    STANDARD = 0
    METERED = 1

def keygen():
    """Generates a Keypair (Stub). Returns (pk, sk) bytes."""
    # In a real impl, we would allocate buffers and pass them
    return (b"dummy_pk", b"dummy_sk")

def encrypt(pk, message: str, mode: EncryptionMode = EncryptionMode.METERED) -> str:
    """Encrypts a message to Sanskrit."""
    # FFI call would go here
    # _lib.abhedya_encrypt_verse(...)
    return "Sanskrit Verse Placeholder"

if __name__ == "__main__":
    print("Abhedya SDK loaded successfully.")
    pk, sk = keygen()
    print(f"Generated Keys.")
    ct = encrypt(pk, "Hello", EncryptionMode.METERED)
    print(f"Encrypted: {ct}")
