const { Abhedya, EncryptionMode } = require('./index');

console.log("--- Testing Abhedya Node.js SDK ---");

try {
    const crypto = new Abhedya();
    
    // 1. KeyGen
    console.log("Generating Keys...");
    const keys = crypto.keygen();
    console.log(`KeyGen Success. PK Size: ${keys.publicKey.length}, SK Size: ${keys.secretKey.length}`);
    
    // 2. Encrypt
    const msg = "Hello from Node.js!";
    console.log(`Encrypting message: "${msg}"`);
    const ct = crypto.encrypt(keys.publicKey, msg, EncryptionMode.STANDARD);
    console.log(`Encryption Success. CT Size: ${ct.length}`);
    
    // 3. Decrypt
    console.log("Decrypting...");
    const recovered = crypto.decrypt(keys.secretKey, ct);
    const recoveredStr = recovered.toString('utf8').replace(/\0/g, ''); // Trim nulls
    console.log(`Decrypted: "${recoveredStr}"`);
    
    if (recovered.includes(Buffer.from(msg))) {
        console.log("PASS: Decrypted message matches original.");
    } else {
        console.log("FAIL: Mismatch.");
    }

} catch (e) {
    console.error("Test Failed:", e.message);
    // Note: This will fail if ffi-napi is not installed. 
    // This is expected in this environment if npm install hasn't run.
}
