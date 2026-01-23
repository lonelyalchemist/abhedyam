#ifndef ABHEDYA_H
#define ABHEDYA_H

#include <stdint.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

/// Encryption Mode for Abhedya
typedef enum {
    ABHEDYA_MODE_STANDARD = 0, // High Performance
    ABHEDYA_MODE_METERED = 1   // Sanskrit Meter (Steganographic)
} AbhedyaEncryptionMode;

/**
 * Generate a new KeyPair.
 * 
 * @param pk_buffer Output buffer for Public Key bits.
 * @param pk_len Pointer to size of pk_buffer. On success, updated with actual length.
 * @param sk_buffer Output buffer for Secret Key bits.
 * @param sk_len Pointer to size of sk_buffer. On success, updated with actual length.
 * @return 0 on success, -1 on failure.
 */
int abhedya_keygen(unsigned char *pk_buffer, size_t *pk_len, 
                   unsigned char *sk_buffer, size_t *sk_len);

/**
 * Encrypt a message into Sanskrit Verse.
 * 
 * @param pk_ptr Pointer to the Public Key structure (or bytes).
 * @param msg The plaintext message (null-terminated string or bytes).
 * @param mode The encryption mode (Standard/Metered).
 * @param out_buffer Output buffer for the Sanskrit text.
 * @param out_len Pointer to size of out_buffer. Updated with actual length.
 * @return 0 on success, -1 on failure.
 */
int abhedya_encrypt_verse(const void *pk_ptr, const char *msg, 
                          AbhedyaEncryptionMode mode, 
                          char *out_buffer, size_t *out_len);

#ifdef __cplusplus
}
#endif

#endif // ABHEDYA_H
