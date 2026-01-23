# Abhedya .NET SDK

To use Abhedya in .NET (C#), use P/Invoke (`[DllImport]`).

## Implementation Guide

```csharp
using System.Runtime.InteropServices;

public class Abhedya {
    [DllImport("abhedya_ffi", CallingConvention = CallingConvention.Cdecl)]
    public static extern int abhedya_keygen(byte[] pk, ref ulong pk_len, byte[] sk, ref ulong sk_len);
}
```
