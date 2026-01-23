# Abhedya Enterprise Architecture (Phase 2)

## 1. Modular Crate Structure

The monolithic `abhedya-core` has been split into specialized components to separate concerns and enable easier auditing/FFI.

| Crate                  | Responsibility                                                                                                                                     | Dependencies                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| **`abhedya-kem`**      | **Core Math Layer**. Implements Lattice-based Key Encapsulation (LWE). Pure logic, `no_std` compatible (potential). Enforces `EncryptionMode` API. | `rand`, `abhedya-chhandas`        |
| **`abhedya-chhandas`** | **Encoding Layer**. Manages Sanskrit prosody, syllable mapping, and meter rules. Independent of crypto logic.                                      | None                              |
| **`abhedya-core`**     | **Facade SDK**. Re-exports functionality from KEM and Chhandas to provide a unified user API.                                                      | `abhedya-kem`, `abhedya-chhandas` |
| **`abhedya-cli`**      | **User Interface**. Proof-of-Concept CLI tool for benchmarking and compliance testing.                                                             | `abhedya-core`                    |

## 2. Encryption Modes

Abhedya now explicitly supports two operating modes via the `EncryptionMode` enum:

```rust
pub enum EncryptionMode {
    Standard, // Raw Mathematical Output. Maximum Throughput (~18ms/op).
    Metered,  // Chhandas Output. Steganographically Secure (~21ms/op).
}
```

- **Standard Mode**: Used for high-speed verified communication where steganography is not required.
- **Metered Mode**: Used for "Hiding in Plain Sight" (Mahakavya). The noise distribution is shaped to match `Laghu/Guru` weights of the Sanskrit meter.

## 3. Dependency Updates

- **Rand 0.9**: Migrated from `0.8.5` to `0.9` (using `rand::distr` instead of `distributions` and `random_range` instead of `gen_range`).
