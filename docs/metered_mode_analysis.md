# Security Analysis: Abhedyam Metered Mode

**Date**: 2026-01-23
**Target Audience**: Cryptographers, Security Researchers, Auditors

## Executive Summary

Abhedyam operates in two distinct modes. This document analyzes the **Metered Mode** (Steganographic), focusing on the specific cryptographic trade-offs it makes to achieve linguistic deniability.

> **Verdict**: Metered Mode trades measurable **entropy** and **performance** for **unobservability**. It is secure for covert communication but possesses a lower theoretical security margin than the FIPS-compliant Standard Mode.

---

## 1. The Pro: Steganographic Unobservability

The primary advantage of Metered Mode is **Censorship Resistance** and **Deniability**.

### 1.1 Linguistic Indistinguishability

- **Fact**: Traditional encodings (Base64, Hex) verify immediately as high-entropy random noise.
- **Mechanism**: Metered Mode constrains the ciphertext ring elements $u \in \mathbb{Z}_q$ such that their projection into the Sanskrit alphabet adheres to strict prosody rules (e.g., _Anushtubh_ meter: Alternating Laghu/Guru weights).
- **Result**: The ciphertext passes:
  - **NLP Filters**: Text statistical analysis recognizes valid syllables and grammatical constructs.
  - **Human Inspection**: Appears as "Mahakavya" (Epic Poetry), not random gibberish.

### 1.2 Channel Viability

- **Use Case**: Allows high-grade encryption over channels that block binary data or high-entropy strings (e.g., social media comments, email bodies, public forums).

---

## 2. The Con: Cryptographic Costs

To achieve linguistic compliance, Metered Mode deviates from standard LWE noise distributions.

### 2.1 Distributional Drift (The "Shaped Noise" Problem)

- **Standard LWE**: Error $e$ is drawn from a Centered Binomial Distribution (CBD), $e \leftarrow \beta_\eta$.
- **Metered LWE**: The system selects an effective error $e'$ such that:
  $$ (A s + e') \pmod q \in \text{Set}_{Mask} $$
  where $\text{Set}_{Mask}$ corresponds to the required target syllable weight (Laghu/Guru).
- **Implication**: The error distribution is **conditional**. It is "clipped" or "shifted" to satisfy the constraints. While the noise remains centered, its tails are shaped by the meter. This potentially lowers the cost of Lattice Reduction attacks (like BKZ) by reducing the uncertainty of the error term.

### 2.2 Entropy Loss

- **Quantification**: By forcing a specific 1-bit property (Weight: Light/Heavy) on every coefficient, we sacrifice approximately **1 bit of entropy per coefficient**.
- **Impact**: For $n=768$, we effectively leak partial information about the noise. While the remaining entropy is sufficient to defeat classical and quantum computers today, the "Security Level" (in NIST bits) is strictly lower than Standard Mode.

### 2.3 Performance Overhead (The Constant-Time Tax)

- **The Fix**: To prevent Timing Oracles (leaking which noise value fit the meter), the system must check a fixed window of candidates (e.g., $\pm 128$ offsets) for _every_ coefficient.
- **Cost**: This makes Metered Mode **~10-50x more computationally expensive** (in raw op-count) compared to the $O(1)$ sampling of Standard Mode (though SIMD/AVX2 mitigates the wall-clock impact).

---

## 3. Recommendation

| Scenario                         | Recommend Mode | Rationale                                                                     |
| :------------------------------- | :------------- | :---------------------------------------------------------------------------- |
| **High Security / Top Secret**   | **Standard**   | Stick to pure, provable CBD noise. Do not trade entropy for aesthetics.       |
| **Covert Ops / Censored Region** | **Metered**    | The ability to transmit _at all_ outweighs the partial loss of security bits. |
| **Long-Term Storage**            | **Standard**   | Steganography is for transit; storage should be maximally hard.               |

## Conclusion

Metered Mode is a **calculated risk**. It is not "weaker" due to incompetence, but due to the mathematically necessary exchange of **Entropy for Structure**. For its intended purpose—anti-censorship—it provides a uniquely powerful capability that standard cryptography cannot.
