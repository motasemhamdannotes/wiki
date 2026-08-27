

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

View the full C programming guide by subscribing to the premium ☕ [Membership](https://buymeacoffee.com/notescatalog/membership)
## 1. PROGRAM STRUCTURE : THE `main()` FUNCTION

### 1.1 Entry Point
Every C program begins execution at `main()`. It is the required entry point defined by the C standard.

```c
// Standard signature — accepts command-line arguments
int main(int argc, char *argv[]) {
    // argc = argument count (number of arguments passed)
    // argv = argument vector (array of strings; argv[0] is the program name)
    return 0;  // 0 = success; non-zero = error condition
}

// Minimal signature — no command-line arguments needed
int main(void) {
    return 0;
}
```

**Return value conventions:**

|Return Value|Meaning|
|---|---|
|`0`|Program exited successfully|
|`1`|General error|
|Any non-zero|Error condition (value may encode the error type)|

> **Note:** The OS reads the return value of `main()`. In shell scripts, `$?` captures it. This is why `exit(0)` vs `exit(1)` matters in production programs and shell pipelines.

---

### 1.2 Compiling and Running a C Program (Linux)

```bash
# Step 1 — Create the source file
nano nameProgram.c

# Step 2 — Compile with GCC (output an executable)
gcc -o nameExecutable nameProgram.c

# Step 3 — Run the program
./nameExecutable

# Compile with warnings enabled (recommended for learners)
gcc -Wall -Wextra -o nameExecutable nameProgram.c

# Compile with debugging symbols (for use with gdb)
gcc -g -o nameExecutable nameProgram.c

# Compile with optimisation
gcc -O2 -o nameExecutable nameProgram.c

# Compile and link multiple source files
gcc -o program file1.c file2.c file3.c

# Compile to object file only (no linking)
gcc -c file.c -o file.o
```

---

## 2. INCLUDE FILES & PREPROCESSOR DIRECTIVES

### 2.1 What Include Files Do

`#include` directives tell the compiler about the existence of **external functions and definitions** — from the standard library or your own header files — before the compiler processes the source code. Without them, the compiler does not know the signature of functions like `printf()` or `malloc()`.

### 2.2 Include Syntax

```c
#include "mine.h"      // Search current working directory first, then system paths
#include <stdio.h>     // Search system include directories (standard library)
#include <stdlib.h>    // Memory allocation, process control
#include <string.h>    // String manipulation functions
#include <math.h>      // Mathematical functions
#include <stdint.h>    // Fixed-width integer types (int32_t, uint64_t, etc.)
```

> **Note:** Use `"quotes"` for your own header files and `<angle brackets>` for system/library headers. This is a convention that also controls the compiler's search path order.

---

### 2.3 Macro Definitions — `#define`

```c
// Simple constant (use UPPERCASE by convention)
#define TRUE  1
#define FALSE 0
#define MAX_BUFFER_SIZE 1024
#define PI 3.14159265358979

// Macro with parameters (inline substitution — not a function)
#define min(a, b)  ((a) < (b) ? (a) : (b))
#define max(a, b)  ((a) > (b) ? (a) : (b))
#define abs(a)     ((a) < 0 ? -(a) : (a))

// Always wrap parameters in parentheses in macros to avoid operator precedence bugs
// BAD:  #define square(x) x * x         — square(1+2) expands to 1+2*1+2 = 5
// GOOD: #define square(x) ((x) * (x))   — square(1+2) expands to ((1+2)*(1+2)) = 9

// Comment insertion macro
#define note /* this comment gets inserted everywhere note appears */

// Multi-line macro using backslash continuation
#define SWAP(a, b, type) \
    do { \
        type temp = (a); \
        (a) = (b); \
        (b) = temp; \
    } while (0)

// Undefine a macro
#undef TRUE
```

---

### 2.4 Conditional Compilation

Conditional compilation is used to control which code is compiled — for debug builds, platform-specific code, or feature flags.

```c
// Basic conditional compilation
#if expression          // Compile following block if expression != 0
    // code
#elif expression        // Else-if branch
    // code
#else                   // Default fallback
    // code
#endif                  // End of conditional block

// Check if a macro is defined
#ifdef DEBUG            // Compile if DEBUG is defined
    printf("Debug mode active\n");
#endif

// Check if a macro is NOT defined (common include guard pattern)
#ifndef MYHEADER_H      // If not yet included...
#define MYHEADER_H      // ...define the guard
    // header content
#endif                  // Include guard closes here

// Practical examples
#ifdef DEBUG
    #define LOG(msg) printf("[DEBUG] %s\n", (msg))
#else
    #define LOG(msg)    // No-op in release builds
#endif

// Platform detection
#ifdef _WIN32
    // Windows-specific code
#elif defined(__linux__)
    // Linux-specific code
#elif defined(__APPLE__)
    // macOS-specific code
#endif
```

---

### 2.5 Other Preprocessor Directives

```c
#error "Stop compiling — this configuration is not supported"
// Immediately halts compilation and displays the message

#line 100 "myfile.c"
// Overrides __LINE__ and __FILE__ for error reporting

#pragma once
// Non-standard but widely supported alternative to include guards

#pragma GCC optimize("O3")
// Compiler-specific instructions via pragma
```

---

## 3. DATA TYPES

### 3.1 Basic Types

```c
char    ch = 'A';           // Character — typically 1 byte; a string is an array of char
int     n  = 42;            // Integer — typically 2 or 4 bytes (platform-dependent)
float   f  = 3.14f;         // Floating point — typically 4 bytes (~7 decimal digits)
double  d  = 3.14159265;    // Double precision float — typically 8 bytes (~15 decimal digits)
void               ;        // Typeless — used for generic pointers and functions with no return
```

### 3.2 Type Modifiers (Prefixes)

Modifiers adjust the size and signedness of basic types:

```c
// Signed vs Unsigned
signed   int  si = -100;       // Has a sign bit (default for int, char)
unsigned int  ui = 4294967295; // No sign bit — all bits used for magnitude

// Size modifiers
short    int  s  = 32767;      // Shorter version — typically 2 bytes
long     int  l  = 2147483647; // Longer version — typically 4 or 8 bytes
long long int ll = 9223372036854775807LL; // 8 bytes minimum

// Combined
unsigned long long int ull = 18446744073709551615ULL;

// Character signed-ness (implementation-defined — be explicit)
signed   char sc = -128;      // Range: -128 to 127
unsigned char uc = 255;       // Range: 0 to 255
```

**Type size summary:**

|Type|Typical Size|Range (signed)|
|---|---|---|
|`char`|1 byte|-128 to 127|
|`short int`|2 bytes|-32,768 to 32,767|
|`int`|4 bytes|-2,147,483,648 to 2,147,483,647|
|`long int`|4 or 8 bytes|Platform-dependent|
|`long long int`|8 bytes|-9.2×10¹⁸ to 9.2×10¹⁸|
|`float`|4 bytes|±3.4×10³⁸|
|`double`|8 bytes|±1.8×10³⁰⁸|

> **Note for security research:** Always use fixed-width types from `<stdint.h>` (`int32_t`, `uint64_t`, etc.) when exact sizes matter — particularly in network protocols, file format parsing, and binary exploitation contexts. Platform-dependent sizes cause portability bugs and potential overflow conditions.

---

### 3.3 Storage Types (Scope & Lifetime Modifiers)

```c
auto     int x;     // Local variable, automatic lifetime (default — rarely written explicitly)
static   int s;     // Persists across function calls; if global, limits scope to file
volatile int v;     // May be changed by external influence (hardware, OS, other threads)
                    // Prevents compiler from caching the value in a register
extern   int e;     // Declared here, defined in another translation unit (source file)
register int r;     // Hint to compiler to keep in CPU register (largely ignored by modern compilers)
```

**Practical examples:**

```c
// static local — retains value between calls
int counter(void) {
    static int count = 0;    // Initialised once; persists
    return ++count;
}

// volatile — essential for hardware register access
volatile unsigned int *gpio_register = (volatile unsigned int *)0x40020000;
*gpio_register = 0x01;    // Compiler will NOT optimise this away

// extern — declare a global variable defined elsewhere
extern int global_config;  // Defined in config.c, used in main.c
```

---
## I. Bitmask Logic & Flags
Bitmasks are frequently used for security descriptors, permissions, and process flags.

- **Security Risk (Logic Errors):** Incorrectly applying bitwise operators can lead to unintended permission grants.
    
    - `|=` (OR): Grants a permission/flag.

    - `&= ~` (AND NOT): Properly clears a specific flag.
        
    - `^=` (XOR): Toggles a flag, which can be dangerous if the state isn't strictly tracked.
        
- **Analyst Note:** When reverse engineering, look for the `TEST` or `AND` assembly instructions. If a "Check" (e.g., `if (status & RPOptionTop)`) is missing, an attacker might bypass a security gate.
    

**Command Snippets:**
```C
// Correct way to clear a bit (Bitwise AND with the bitwise NOT)
status &= ~RPOptionBottom; 

// The 'Check' - critical for security gates
if (status & RPOptionTop) { 
    // Execute privileged action
}
```

