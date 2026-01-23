# Abhedya: Technical Specification

## 1. Introduction

**Abhedya** (Sanskrit: _Unbreakable_) is a Post-Quantum Cryptography (PQC) framework. It hides encrypted data inside valid Sanskrit poetry ("Mahakavya").

## 2. Mathematical Foundation

It uses **Learning With Errors (LWE)**, a standard lattice-based cryptographic method.

### 2.1 Parameters

- **Dimension (n)**: 768 (Same as Kyber-768 / NIST Level 3)
- **Modulus (q)**: 3329 (Prime number)
- **Error Distribution**: Centered Binomial

### 2.2 Core Operations

1.  **Key Generation**:
    - Create a random public matrix **A**.
    - Create a secret vector **s** and error **e**.
    - Public Key = **(A, b)** where **b = A\*s + e**.

2.  **Encryption**:
    - To send a message **M**, we generate random noise **r, e1, e2**.
    - **u = A^T \* r + e1**
    - **v = b^T _ r + e2 + M _ (q/2)**
    - The ciphertext is the pair **(u, v)**.

## 3. The "Abhedya" Encoding (Sanskrit Mapping)

We map the numbers from the ciphertext (0 to 3328) into Sanskrit syllables.

### 3.1 Mapping Logic

Total Syllables = 528 (33 Consonants \* 16 Vowels).

Because the modulus (3329) is larger than the alphabet (528), we use a "Many-to-One" mapping:

- **Index** = Value modulo 528
- **Consonant** = floor(Index / 16)
- **Vowel** = Index modulo 16

**Security Implication**:
This means multiple mathematical values map to the same Sanskrit syllable.

- **Low Bits**: Determine the visible text (Conosnant/Vowel).
- **High Bits**: Hidden secret information (the "LWE Noise").
- **Result**: The visible text looks like normal poetry, but the hidden high bits carry the secure cryptographic payload. s

## 4. Chhandas (Metered) Mode

In **Metered Mode**, we force the output to follow a poetic rhythm (Meter), specifically the _Anushtubh_ meter (8 syllables per line).

### 4.1 Shaping Algorithm

Sanskrit syllables are Light (Laghu) or Heavy (Guru).
To encrypt a value while satisfying the meter:

1.  Calculate which weight (Light/Heavy) is required at the current position.
2.  Generate the ciphertext value.
3.  Check if the resulting Sanskrit syllable matches the required weight.
4.  **If not**, slightly adjust the randomness (noise) and try again until it matches.

This "Rejection Sampling" technique ensures:

- The text is perfect poetry.
- The encryption remains mathematically secure (High bits are preserved).

## 5. Architecture

- **abhedya-kem**: Core Math Library.
- **abhedya-chhandas**: Sanskrit Encoding Library.
- **abhedya-cli**: tool for running benchmarks.

USAGE:
Run `cargo run --bin abhedya-cli -- --benchmark` to verify compliance.
Run `cargo run --bin abhedya-cli -- --benchmark --meter` for Metered Mode.
