const ffi = require('ffi-napi');
const ref = require('ref-napi');
const path = require('path');
const os = require('os');

// Type Definitions
const size_t = ref.types.size_t;
const int = ref.types.int;
const uchar = ref.types.uchar;
const ucharPtr = ref.refType(uchar);
const size_tPtr = ref.refType(size_t);

// Load Library
const libName = os.platform() === 'darwin' ? 'libabhedya_ffi.dylib' : 'libabhedya_ffi.so';
// Try local release build first, then system path
const libPath = path.resolve(__dirname, '../../target/release', libName);

const lib = ffi.Library(libPath, {
    'abhedya_keygen': [int, [ucharPtr, size_tPtr, ucharPtr, size_tPtr]],
    'abhedya_encrypt': [int, [ucharPtr, size_t, ucharPtr, size_t, int, ucharPtr, size_tPtr]],
    'abhedya_decrypt': [int, [ucharPtr, size_t, ucharPtr, size_t, ucharPtr, size_tPtr]]
});

// Constants
const N = 768;
const BLOCK_SIZE = (N + 1) * 2; // 1538

const EncryptionMode = {
    STANDARD: 0,
    METERED: 1
};

class Abhedya {
    constructor() {}

    /**
     * Generate KeyPair
     * @returns {{publicKey: Buffer, secretKey: Buffer}}
     */
    keygen() {
        const pkSizeEstimate = (N * N + N) * 2;
        const skSizeEstimate = N * 2;

        const pkBuf = Buffer.alloc(pkSizeEstimate);
        const skBuf = Buffer.alloc(skSizeEstimate);
        const pkLen = ref.alloc(size_t, pkSizeEstimate);
        const skLen = ref.alloc(size_t, skSizeEstimate);

        const res = lib.abhedya_keygen(pkBuf, pkLen, skBuf, skLen);
        if (res !== 0) throw new Error(`KeyGen failed with code ${res}`);

        // Slice to actual size
        const actualPkLen = pkLen.deref();
        const actualSkLen = skLen.deref();

        return {
            publicKey: pkBuf.slice(0, actualPkLen),
            secretKey: skBuf.slice(0, actualSkLen)
        };
    }

    /**
     * Encrypt Message
     * @param {Buffer} pk 
     * @param {Buffer} msg 
     * @param {number} mode 
     */
    encrypt(pk, msg, mode = EncryptionMode.STANDARD) {
        if (!Buffer.isBuffer(msg)) msg = Buffer.from(msg);
        
        const numBits = msg.length * 8;
        const maxOutLen = numBits * BLOCK_SIZE;
        
        const outBuf = Buffer.alloc(maxOutLen);
        const outLen = ref.alloc(size_t, maxOutLen);
        
        const res = lib.abhedya_encrypt(pk, pk.length, msg, msg.length, mode, outBuf, outLen);
        if (res !== 0) throw new Error(`Encryption failed with code ${res}`);
        
        const actualOutLen = outLen.deref();
        return outBuf.slice(0, actualOutLen);
    }

    /**
     * Decrypt Ciphertext
     * @param {Buffer} sk 
     * @param {Buffer} ct 
     */
    decrypt(sk, ct) {
        if (ct.length % BLOCK_SIZE !== 0) throw new Error('Invalid ciphertext length');
        
        const numBits = ct.length / BLOCK_SIZE;
        const numBytes = Math.ceil(numBits / 8);
        
        const outBuf = Buffer.alloc(numBytes);
        const outLen = ref.alloc(size_t, numBytes);
        
        const res = lib.abhedya_decrypt(sk, sk.length, ct, ct.length, outBuf, outLen);
        if (res !== 0) throw new Error(`Decryption failed with code ${res}`);
        
        const actualOutLen = outLen.deref();
        return outBuf.slice(0, actualOutLen);
    }
}

module.exports = { Abhedya, EncryptionMode };
