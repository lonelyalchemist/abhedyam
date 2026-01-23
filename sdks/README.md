# Abhedya SDKs

This folder contains the official Software Development Kits for interacting with the Abhedya Core.

## Supported Languages

| Language    | Path          | Status                   |
| :---------- | :------------ | :----------------------- |
| **C/C++**   | `sdks/native` | **Ready** (Header + Lib) |
| **Python**  | `sdks/python` | **Ready** (Wrapper)      |
| **Node.js** | `sdks/js`     | _Blueprint_              |
| **Go**      | `sdks/go`     | _Blueprint_              |
| **.NET**    | `sdks/dotnet` | _Blueprint_              |

## Architecture

All SDKs wrap the **Native C-ABI Shared Library** (`abhedya-ffi`) found in `sdks/native/lib`. This ensures consistent performance (~5µs decryption) across all languages.
