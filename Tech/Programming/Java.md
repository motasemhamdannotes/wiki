

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)
> 

> **Domain:** Object-Oriented Programming | JVM Platform | Enterprise Development  
> **Relevance:** Android Development, Enterprise Backend (Spring), Security Tool Development, OSCP/CTF Java Exploitation, Android Pentesting (APK reverse engineering targets Java bytecode)

## 1. PROGRAM STRUCTURE & COMPILATION

### 1.1 Hello World — The Mandatory Starting Point

Java enforces a strict structure: every program must have at minimum one **public class** whose name exactly matches the filename, and an entry point method with a precise signature.

```java
// File MUST be named: HelloWorld.java
// Class name MUST match the filename exactly (case-sensitive)
public class HelloWorld {

    // Entry point — JVM calls this method to start the program
    // String[] args receives command-line arguments
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

> **Note:** Java is **case-sensitive** in all things — class names, method names, variable names, and the filename. `HelloWorld.java` and `helloworld.java` are different files to the OS and to the Java compiler. If the class name does not match the filename exactly, the compiler will throw an error.

---

### 1.2 Compilation and Execution

Java is a **compiled-then-interpreted** language. Source code (`.java`) is compiled to bytecode (`.class`), which then runs on the JVM (Java Virtual Machine). This "write once, run anywhere" model means the same `.class` files run on any OS with a compatible JVM.

```bash
# Step 1 — Compile: .java source → .class bytecode
javac HelloWorld.java
# Output: HelloWorld.class (JVM bytecode)

# Step 2 — Run: JVM interprets the bytecode
java HelloWorld
# Note: do NOT include .class extension when running

# Compile all .java files in current directory
javac *.java

# Compile with classpath (for external libraries/JARs)
javac -cp .:lib/external.jar HelloWorld.java

# Run with classpath
java -cp .:lib/external.jar HelloWorld

# Run with JVM options (set heap size, enable assertions)
java -Xmx512m -ea HelloWorld

# One-source-file programs (Java 11+) — skip javac step
java HelloWorld.java

# Check installed Java version
java -version
javac -version
```

**Compilation flow:**

```
HelloWorld.java  →  javac compiler  →  HelloWorld.class  →  JVM  →  Output
(source code)                         (bytecode)          (runtime)
```

---

## 2. DATA TYPES

### 2.1 Primitive Types

Java has 8 primitive types that are stored directly by value (not as objects) and are therefore more memory-efficient and faster for arithmetic.

|Type|Category|Size|Range|Default|
|---|---|---|---|---|
|`byte`|Integer|1 byte|-128 to 127|`0`|
|`short`|Integer|2 bytes|-32,768 to 32,767|`0`|
|`int`|Integer|4 bytes|-2³¹ to (2³¹)-1 (~2.1 billion)|`0`|
|`long`|Integer|8 bytes|-2⁶³ to (2⁶³)-1|`0L`|
|`float`|Floating-point|4 bytes|32-bit IEEE 754 (~7 decimal digits)|`0.0f`|
|`double`|Floating-point|8 bytes|64-bit IEEE 754 (~15 decimal digits)|`0.0d`|
|`boolean`|Boolean|JVM-dependent|`true` or `false`|`false`|
|`char`|Character|2 bytes|0 to 65,535 (Unicode UTF-16)|`'\u0000'`|

```java
// Literals and suffixes
int    i  = 1_000_000;       // Underscores allowed for readability (Java 7+)
long   l  = 9_000_000_000L;  // L suffix required for long literals > int range
float  f  = 3.14f;           // f suffix required — else defaults to double
double d  = 3.14159265358979; // Default type for floating-point literals
char   c  = 'A';             // Single quotes for char
char   c2 = '\u0041';        // Unicode escape — also 'A'
boolean b = true;

// Hex, binary, octal literals
int hex  = 0xFF;     // 255
int bin  = 0b1010;   // 10
int oct  = 017;      // 15
```

### 2.2 Non-Primitive: String

`String` is a **class**, not a primitive. Strings in Java are **immutable** — once created, their content cannot be changed. Every modification creates a new String object.

```java
String s = "Hello World";           // String literal (from the String pool)
String s2 = new String("Hello");    // New object on heap (avoid — prefer literal)

// String is NOT a primitive but behaves like one in common usage
// String + concatenation works with any type
String result = "Value: " + 42;     // "Value: 42"
String result2 = "Pi = " + 3.14;    // "Pi = 3.14"
```

---

## 3. VARIABLES, DECLARATIONS, AND ASSIGNMENTS

### 3.1 Declaration, Initialisation, and Assignment

```java
// Declaration — allocates memory, variable holds default value
int a, b;           // a = 0, b = 0 (default for int)
String name;        // name = null (default for objects)

// Assignment
a = 13212;          // Assign a literal value
b = a + 5;          // Assign the result of an expression

// Initialisation — declare and assign in one statement
int c = a + b;

// Final variable — cannot be reassigned after initialisation (constant)
final double PI    = 3.14159265358979;
final int    LIMIT = 100;

// var — local type inference (Java 10+)
var message = "Hello";    // Inferred as String
var count   = 0;          // Inferred as int
var list    = new ArrayList<String>();  // Inferred as ArrayList<String>
```

---

### 3.2 Compound Assignment Operators

These operators combine an arithmetic or bitwise operation with assignment.

```java
int a = 10, b = 3;

a += b;    // a = a + b   → a = 13
a -= b;    // a = a - b   → a = 10
a *= b;    // a = a * b   → a = 30
a /= b;    // a = a / b   → a = 10
a %= b;    // a = a % b   → a = 1
a ^= b;    // a = a ^ b   → a = 2  (bitwise XOR)
a &= b;    // a = a & b   → bitwise AND
a |= b;    // a = a | b   → bitwise OR
a <<= 1;   // a = a << 1  → left shift (multiply by 2)
a >>= 1;   // a = a >> 1  → right shift (divide by 2)

// Increment and Decrement
a++;       // Post-increment: use a, then increment
++a;       // Pre-increment: increment, then use
a--;       // Post-decrement
--a;       // Pre-decrement
```

---

## 4. OPERATORS

### 4.1 Comparison Operators

All comparison operators return a `boolean` (`true` or `false`).

|Operator|Meaning|Example|
|---|---|---|
|`==`|Equal to|`a == b`|
|`!=`|Not equal to|`a != b`|
|`<`|Less than|`a < b`|
|`>`|Greater than|`a > b`|
|`<=`|Less than or equal|`a <= b`|
|`>=`|Greater than or equal|`a >= b`|

> **Critical Note:** `==` on objects (including `String`) compares **references** (memory addresses), NOT content. Always use `.equals()` to compare object content:
> 
> ```java
> String s1 = new String("hello");
> String s2 = new String("hello");
> s1 == s2        // false — different objects in memory
> s1.equals(s2)   // true  — same content
> ```

### 4.2 Logical Operators

```java
boolean a = true, b = false;

a && b    // AND — false (both must be true); short-circuit: if a is false, b not evaluated
a || b    // OR  — true  (at least one must be true); short-circuit: if a is true, b not evaluated
!a        // NOT — false
a ^ b     // XOR — true (exactly one must be true)
```

---

## 5. INPUT, OUTPUT, AND TYPE CONVERSIONS

### 5.1 Printing Output

```java
// System.out.print — print without newline
System.out.print("Hello ");
System.out.print("World");       // Output: Hello World

// System.out.println — print with newline appended
System.out.println("Hello World");   // Output: Hello World\n
System.out.println();                // Print just a newline

// System.out.printf — formatted output (like C's printf)
System.out.printf("Name: %s, Age: %d, Score: %.2f%n", "Alice", 30, 98.5);
// Output: Name: Alice, Age: 30, Score: 98.50

// String.format — create formatted string (same format specifiers as printf)
String formatted = String.format("Pi = %.4f", Math.PI);
System.out.println(formatted);    // Pi = 3.1416

// Common format specifiers
// %d   — integer (decimal)
// %f   — floating-point
// %.2f — float with 2 decimal places
// %s   — string
// %c   — character
// %b   — boolean
// %n   — platform-independent newline
// %x   — hex integer
// %o   — octal integer
```

---

### 5.2 Parsing Command-Line Arguments

```java
public static void main(String[] args) {
    // args[0] is the first argument, args[1] the second, etc.
    // All args are received as String — must parse to use as numbers

    int    n      = Integer.parseInt(args[0]);        // "42"    → 42
    double d      = Double.parseDouble(args[0]);       // "3.14"  → 3.14
    long   l      = Long.parseLong(args[0]);           // "99999" → 99999L
    float  f      = Float.parseFloat(args[0]);         // "1.5"   → 1.5f
    boolean bool  = Boolean.parseBoolean(args[0]);     // "true"  → true
}
```

---

### 5.3 Type Conversion — Implicit and Explicit

Java supports two conversion types: **widening** (automatic, safe) and **narrowing** (explicit cast, may lose data).

```java
// Widening conversion — automatic (smaller → larger type, no data loss)
int    i = 100;
long   l = i;        // int → long: automatic
double d = i;        // int → double: automatic
float  f = i;        // int → float: automatic

// Narrowing conversion — explicit cast required (larger → smaller, may lose data)
double pi    = 3.14159;
int    piInt = (int) pi;    // 3 — fractional part truncated

long  bigNum  = 1_000_000_000L;
int   smaller = (int) bigNum;   // may overflow

// String to number
int    n = Integer.parseInt("42");
double d = Double.parseDouble("3.14");

// Number to String
String s1 = String.valueOf(42);          // "42"
String s2 = Integer.toString(42);        // "42"
String s3 = "" + 42;                     // "42" — concatenation trick
```

**Type conversion examples from the source:**

|Expression|Result Type|Value|Explanation|
|---|---|---|---|
|`(1 + 2 + 3 + 4) / 4.0`|`double`|`2.5`|int ÷ double → double|
|`Math.sqrt(4)`|`double`|`2.0`|Math methods return double|
|`"123343" + 99`|`String`|`"12334399"`|String + int = String concat|
|`11 * 0.25`|`double`|`2.75`|int × double → double|
|`(int) 11 * 0.25`|`double`|`2.75`|Cast applies to 11 only: (int)11 = 11, then 11 * 0.25 = double|
|`11 * (int) 0.25`|`int`|`0`|(int)0.25 = 0, then 11 * 0 = 0 (int)|
|`(int) (11 * 0.25)`|`int`|`2`|11 * 0.25 = 2.75 (double), then cast → 2|

---

## 6. MATH LIBRARY

The `Math` class provides a wide range of mathematical operations. All methods are static — call them as `Math.methodName()`.

```java
// Absolute value
Math.abs(-5.5)         // 5.5
Math.abs(-3)           // 3

// Min and Max
Math.max(3.5, 7.2)     // 7.2
Math.min(3.5, 7.2)     // 3.5

// Trigonometry (angles in radians)
Math.sin(Math.PI / 2)  // 1.0
Math.cos(0)            // 1.0
Math.tan(Math.PI / 4)  // 1.0 (approximately)

// Angle conversions
Math.toRadians(180)    // π ≈ 3.14159...
Math.toDegrees(Math.PI) // 180.0

// Powers and roots
Math.sqrt(16)          // 4.0
Math.cbrt(27)          // 3.0
Math.pow(2, 10)        // 1024.0
Math.exp(1)            // e ≈ 2.71828...

// Rounding
Math.ceil(4.2)         // 5.0
Math.floor(4.9)        // 4.0
Math.round(4.5)        // 5 (long)

// Logarithms
Math.log(Math.E)       // 1.0 (natural log)
Math.log10(100)        // 2.0

// Random number [0.0, 1.0)
Math.random()          // e.g., 0.7361...

// Generate random int between min (inclusive) and max (exclusive)
int min = 1, max = 10;
int randomInt = (int)(Math.random() * (max - min)) + min;

// Constants
Math.PI    // 3.141592653589793
Math.E     // 2.718281828459045
```

---

## 7. CONTROL FLOW

### 7.1 `if` / `else if` / `else`

```java
int x = 5, y = 3;

// Basic if
if (x > y) {
    System.out.println("x is greater");
}

// if-else
if (x > y) {
    System.out.println("x is greater");
} else {
    System.out.println("y is greater or equal");
}

// if-else if chain (nested if)
int score = 78;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");    // Executes
} else {
    System.out.println("F");
}

// Ternary operator — inline if-else
String result = (x > y) ? "x wins" : "y wins";

// Enhanced switch expression (Java 14+)
String grade = switch (score / 10) {
    case 10, 9 -> "A";
    case 8     -> "B";
    case 7     -> "C";
    default    -> "F";
};
```

---

### 7.2 `switch` Statement

```java
int month = 8;
String monthString;

switch (month) {          // switch on int, String, char, or enum
    case 1:  monthString = "January";   break;
    case 2:  monthString = "February";  break;
    case 3:  monthString = "March";     break;
    case 4:  monthString = "April";     break;
    case 5:  monthString = "May";       break;
    case 6:  monthString = "June";      break;
    case 7:  monthString = "July";      break;
    case 8:  monthString = "August";    break;   // Executes
    case 9:  monthString = "September"; break;
    case 10: monthString = "October";   break;
    case 11: monthString = "November";  break;
    case 12: monthString = "December";  break;
    default: monthString = "Invalid month"; break;
}

// Modern switch expression (Java 14+) — no break needed, returns value
String name = switch (month) {
    case 1  -> "January";
    case 2  -> "February";
    // ...
    case 8  -> "August";
    default -> "Invalid";
};
```

> **Note:** Unlike Go, Java's `switch` **does fall through** without `break`. Omitting `break` causes execution to continue into the next case — a frequent source of bugs. Always include `break` unless fall-through is intentional. The modern arrow-syntax switch expression (`->`) never falls through.

---

## 8. LOOPS

### 8.1 `for` Loop

```java
// Classic C-style for loop
for (int i = 0; i <= 10; i++) {
    System.out.println(i);
}

// Decrement
for (int i = 10; i >= 0; i--) {
    System.out.print(i + " ");
}

// Multiple variables
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.printf("i=%d j=%d%n", i, j);
}

// Infinite loop
for (;;) {
    break;    // use break to exit
}
```

---

### 8.2 Enhanced `for` Loop (for-each)

The for-each loop iterates over any array or `Iterable` collection without an index counter.

```java
// Iterating over an array
int[] numbers = {100, 200, 300, 400};
for (int number : numbers) {
    System.out.println(number);
}

// Iterating over a collection
List<String> names = List.of("Alice", "Bob", "Charlie");
for (String name : names) {
    System.out.println(name);
}

// Iterating over a Map
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

> **Note:** The for-each loop cannot be used to modify the underlying array (modifying `number` doesn't change `numbers[i]`). Use a traditional `for` loop with an index when you need to write back to the array.

---

### 8.3 `while` and `do-while` Loops

```java
// while — condition checked BEFORE each iteration
// May execute 0 times if condition is initially false
int power = 1;
while (power <= 10 / 2) {    // 5
    System.out.println(power);
    power++;
}

// do-while — body executes AT LEAST ONCE, then condition checked
int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 10);

// Loop control
for (int j = 0; j < 10; j++) {
    if (j == 3) continue;    // Skip iteration where j == 3
    if (j == 7) break;       // Exit loop when j == 7
    System.out.println(j);   // Prints 0,1,2,4,5,6
}

// Labelled break — exit nested loops
outer:
for (int row = 0; row < 5; row++) {
    for (int col = 0; col < 5; col++) {
        if (col == 2) break outer;    // Breaks all the way to the outer label
        System.out.printf("[%d,%d] ", row, col);
    }
}
```

---

## 9. ARRAYS

### 9.1 Declaration Forms

Java arrays are **fixed-size** and **typed** — once created, the size cannot change. The `[]` can go on the type or the variable name.

```java
// Type-side declaration (preferred style)
int[]           ai;         // array of int
short[][]       as;         // array of array of short (2D)
Object[]        ao;         // array of Object

// Variable-side declaration (older C-style — legal but less common)
short s, aas[][];           // s is a scalar short; aas is a 2D short array

// Generic array
Collection<?>[] ca;         // array of Collection of unknown type
```

---

### 9.2 Initialisation

```java
// Declaration + allocation (elements initialised to 0/null/false)
int[] arr = new int[10];        // 10 ints, all 0
String[] names = new String[5]; // 5 Strings, all null

// Declaration + inline initialisation (size inferred from values)
int[] factorial  = { 1, 1, 2, 6, 24, 120, 720, 5040 };
char[] letters   = { 'n', 'o', 't', ' ', 'a', ' ', 'S', 't', 'r' };
String[] words   = { "array", "of", "String" };

// 2D array allocation
int[][] matrix       = new int[3][4];        // 3 rows × 4 cols
int[][] matrix2      = new int[3][];         // Jagged: rows allocated separately
int[][] predefined   = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };

Object arr2[][] = new Exception[2][3];       // Valid — Exception is a subclass of Object

// Access and modify
arr[0] = 42;
System.out.println(arr[0]);       // 42
System.out.println(arr.length);   // 10

// 2D access
matrix[1][2] = 99;
System.out.println(predefined[2][1]);   // 8
```

---

### 9.3 Common Array Operations

```java
import java.util.Arrays;

int[] arr = {5, 2, 8, 1, 9, 3};

// Sort ascending (in-place, modifies original array)
Arrays.sort(arr);                          // {1, 2, 3, 5, 8, 9}

// Sort a range — sort elements at indices [1, 4)
Arrays.sort(arr, 1, 4);

// Binary search (array must be sorted first)
int idx = Arrays.binarySearch(arr, 5);    // Returns index of 5

// Fill array with a value
Arrays.fill(arr, 0);                       // All elements = 0

// Copy — creates a new array
int[] copy = Arrays.copyOf(arr, arr.length);
int[] range = Arrays.copyOfRange(arr, 1, 4);  // Copy indices [1, 4)

// Compare two arrays for equality
boolean equal = Arrays.equals(arr, copy);     // true

// Convert to String for printing
System.out.println(Arrays.toString(arr));      // [1, 2, 3, 5, 8, 9]
System.out.println(Arrays.deepToString(predefined)); // 2D array to String
```

---

## 10. ACCESS MODIFIERS

Access modifiers control the visibility of classes, fields, and methods.

|Modifier|Class|Package|Subclass|Everywhere|
|---|---|---|---|---|
|`public`|✓|✓|✓|✓|
|`protected`|✓|✓|✓|✗|
|_(default)_|✓|✓|✗|✗|
|`private`|✓|✗|✗|✗|

```java
public class Example {
    public    int publicField    = 1;    // Accessible everywhere
    protected int protectedField = 2;    // Accessible within package + subclasses
              int defaultField   = 3;    // Package-private (no keyword)
    private   int privateField   = 4;    // Only within this class

    public    void publicMethod()    {}
    protected void protectedMethod() {}
              void defaultMethod()   {}
    private   void privateMethod()   {}
}
```

---

## 11. NON-ACCESS MODIFIERS

```java
// static — belongs to the class, not any instance
static int counter = 0;
public static void increment() { counter++; }

// final — cannot be modified / overridden / inherited
final int MAX = 100;                    // Constant — cannot be reassigned
final class ImmutableClass {}           // Cannot be subclassed
public final void cannotOverride() {}   // Cannot be overridden in subclass

// abstract — must be implemented by subclass; class cannot be instantiated
abstract class Shape { abstract double area(); }

// synchronized — only one thread can execute this method at a time
public synchronized void threadSafeMethod() {}

// volatile — variable always read from main memory (not CPU cache); for thread visibility
volatile boolean flag = false;

// transient — field excluded from serialization
transient String password;    // Will not be written when object is serialized
```

---

## 12. OBJECT-ORIENTED PROGRAMMING

### 12.1 Objects — Creating and Using

An **object** is an instance of a class. It has **state** (fields/instance variables) and **behaviour** (methods).

```java
// Step 1: Declare a reference variable (holds the address of an object)
String s;

// Step 2: Create (instantiate) the object using the 'new' keyword + constructor
s = new String("Hello World");

// Combined declaration + instantiation
String s2 = new String("Hello World");
// Or using string literal (preferred for String)
String s3 = "Hello World";

// Step 3: Call instance methods on the object
char c = s.charAt(4);        // 'o'
int len = s.length();        // 11
String upper = s.toUpperCase();  // "HELLO WORLD"
```

---

### 12.2 Instance Variables

Instance variables belong to individual objects — each object has its own copy.

```java
public class Charge {
    // Instance variable declarations
    // final = set once in constructor, never changed
    private final double rx;    // x-coordinate of charge
    private final double ry;    // y-coordinate of charge
    private final double q;     // charge value

    public Charge(double rx, double ry, double q) {
        this.rx = rx;    // 'this' disambiguates instance var from parameter
        this.ry = ry;
        this.q  = q;
    }
}
```

---

### 12.3 Methods

```java
// Method signature: [access] [modifiers] returnType methodName(parameters)
public static double sum(int a, int b) {
    int result;              // Local variable — only exists inside this method
    result = a + b;
    return result;           // Must match return type (double here — auto-widened from int)
}

// Method with no return value
public void printInfo() {
    System.out.println("Name: " + name);
    // No return statement needed (void)
}

// Method overloading — same name, different parameters
public int multiply(int a, int b) { return a * b; }
public double multiply(double a, double b) { return a * b; }
public int multiply(int a, int b, int c) { return a * b * c; }

// Calling methods
double total = sum(3, 4);    // 7.0
multiply(3, 4);               // calls int version
multiply(3.0, 4.0);          // calls double version
```

---

## 13. CLASS DECLARATION AND CONSTRUCTORS

### 13.1 Class Structure

```java
// Basic class structure
class MyClass {
    // Fields (instance variables)
    // Constructors
    // Methods
}

// Full class example — Bicycle
public class Bicycle {

    // Fields — state of the bicycle
    public int cadence;
    public int gear;
    public int speed;

    // Constructor — called when 'new Bicycle(...)' is used
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        this.gear    = startGear;
        this.cadence = startCadence;
        this.speed   = startSpeed;
    }

    // Methods — behaviour of the bicycle
    public void setCadence(int newValue) { cadence = newValue; }
    public void setGear(int newValue)    { gear    = newValue; }
    public void applyBrake(int decrement) { speed -= decrement; }
    public void speedUp(int increment)   { speed  += increment; }
}

// Instantiate and use
Bicycle myBike = new Bicycle(30, 0, 8);
myBike.speedUp(10);
myBike.setCadence(90);
```

---

### 13.2 Inheritance and Interface Implementation

```java
// Extending a class AND implementing an interface
class MyClass extends MySuperClass implements YourInterface {
    // MyClass IS-A MySuperClass (inheritance)
    // MyClass CAN-DO YourInterface (implementation contract)
}

// Java supports single inheritance (one superclass only)
// but multiple interface implementation
class Bird extends Animal implements Flyable, Swimmable {
    // ...
}
```

---

### 13.3 Constructors

```java
public class Bicycle {

    private int gear;
    private int cadence;
    private int speed;

    // Parameterised constructor
    public Bicycle(int startCadence, int startSpeed, int startGear) {
        this.gear    = startGear;
        this.cadence = startCadence;
        this.speed   = startSpeed;
    }

    // No-args constructor — calls superclass no-args constructor with super()
    public Bicycle() {
        super();    // Calls Object() constructor (implicit if omitted)
    }
}
```

**Constructor rules:**

- Constructor name must **exactly** match the class name
- Constructors have **no return type** (not even `void`)
- If no constructor is defined, Java provides a default no-args constructor
- Once you define any constructor, the default no-args constructor is **no longer provided**
- Use `this(args)` to call another constructor in the same class
- Use `super(args)` to call the parent class constructor (must be first statement)

---

## 14. POLYMORPHISM

Polymorphism means "many forms" — the same method call behaves differently depending on the actual object type.

### 14.1 Compile-Time Polymorphism — Method Overloading

Same method name, different parameter lists. The compiler determines which version to call based on the argument types at compile time.

```java
public class Circle {

    // Three overloaded versions of draw()
    public void draw() {
        System.out.println("Drawing circle: Black, 1cm diameter");
    }

    public void draw(int diameter) {
        System.out.println("Drawing circle: Black, " + diameter + "cm diameter");
    }

    public void draw(int diameter, String color) {
        System.out.println("Drawing circle: " + color + ", " + diameter + "cm diameter");
    }
}

Circle c = new Circle();
c.draw();                  // Calls first version
c.draw(5);                 // Calls second version
c.draw(5, "Red");          // Calls third version
```

---

### 14.2 Runtime Polymorphism — Method Overriding

The subclass provides its own implementation of a method defined in the superclass. The JVM determines which version to call at runtime based on the actual object type.

```java
// Interface (or superclass) defines the contract
public interface Shape {
    void draw();
}

// Multiple classes implement the same interface
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing Circle");
    }
}

public class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing Square");
    }
}

// Runtime polymorphism — same variable type, different object
Shape sh = new Circle();
sh.draw();    // "Drawing Circle" — Circle's draw() is called

sh = new Square();
sh.draw();    // "Drawing Square" — Square's draw() is called

// The power: write code against the interface, not the implementation
void render(Shape shape) {
    shape.draw();    // Works for ANY Shape implementation — past and future
}
render(new Circle());    // "Drawing Circle"
render(new Square());    // "Drawing Square"
```

> **`@Override` annotation:** Always use `@Override` when overriding — it tells the compiler to verify the method actually overrides something. Without it, a typo in the method name silently creates a new method instead of overriding.

---

## 15. INHERITANCE

```java
// Superclass (parent)
public class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
    }

    public String getName() { return name; }

    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Interface
public interface Swimable {
    void swim();    // Abstract method — implementing class must define it
}

// Subclass — inherits from Animal, implements Swimable
public class Dog extends Animal implements Swimable {

    private String breed;

    public Dog(String name, String breed) {
        super(name);    // Call parent constructor — must be first statement
        this.breed = breed;
    }

    @Override
    public void eat() {
        System.out.println(getName() + " is eating dog food");
        // super.eat();  — optionally call parent version
    }

    @Override
    public void swim() {
        System.out.println(getName() + " is swimming");
    }

    public String getBreed() { return breed; }
}
```

**Inheritance rules:**

- Java supports **single inheritance** for classes (one parent only)
- Java supports **multiple inheritance** through interfaces (implement many)
- `extends` for class inheritance; `implements` for interfaces
- `super.method()` calls the parent version of an overridden method
- `super(args)` calls the parent constructor

---

## 16. ABSTRACTION

### 16.1 Abstract Class

An abstract class defines a partial implementation — some methods are implemented, others are declared but left for subclasses to fill in.

```java
abstract class Flower {

    // Abstract method — no body; subclass MUST implement
    abstract String smell();

    // Concrete method — has a body; subclass inherits as-is
    String oil() {
        System.out.println("Flower oil is good.");
        return "floral oil";
    }
}

public class Lily extends Flower {

    @Override
    String smell() {     // Must implement the abstract method
        return "Lily smells like lavender.";
    }
}

// Cannot instantiate abstract class directly
// Flower f = new Flower();  — compile error

// Can use as a type (reference variable)
Flower f = new Lily();
f.smell();    // "Lily smells like lavender."
f.oil();      // "Flower oil is good."
```

---

### 16.2 Interface

An interface is a fully abstract type that defines a **contract** — what implementing classes must do, without specifying how.

```java
// Basic interface — all methods implicitly public and abstract
interface Printable {
    void printDocument();
}

// Interface with default and static methods (Java 8+)
interface Vehicle {
    void accelerate();                          // Abstract
    void stop();                               // Abstract

    default void honk() {                      // Default implementation
        System.out.println("Beep!");
    }

    static void describe() {                   // Static utility method
        System.out.println("A vehicle moves things");
    }
}

// Implementation
public class A4 implements Printable {
    @Override
    public void printDocument() {
        System.out.println("A4 Page Printed.");
    }
}

// Interface vs Abstract Class:
// Interface: use when unrelated classes should share behaviour (capability)
// Abstract class: use when related classes share state and partial implementation
```

---

## 17. ENCAPSULATION

Encapsulation bundles data (fields) and the code that operates on that data (methods) into a single unit (class), and restricts direct access to the internal data.

```java
// POJO (Plain Old Java Object) — the classic encapsulation pattern
public class User {

    // Private fields — hidden from external access
    private String username;
    private String password;
    private int    age;

    // Public getter — controlled read access
    public String getUsername() {
        return username;
    }

    // Public setter — controlled write access (can include validation)
    public void setUsername(String username) {
        if (username != null && !username.isEmpty()) {
            this.username = username;
        }
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        // Validate before storing (e.g., min length)
        if (password != null && password.length() >= 8) {
            this.password = password;
        }
    }

    public int getAge() { return age; }

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        }
    }
}

// Usage — external code cannot touch private fields directly
User user = new User();
user.setUsername("alice");
user.setPassword("securePass123");
System.out.println(user.getUsername());    // "alice"
// user.password = "hack";  — compile error — private field
```

> **Note:** Modern Java often uses **Records** (Java 16+) for simple immutable data containers, or **Lombok** annotations (`@Data`, `@Getter`, `@Setter`) to auto-generate boilerplate getter/setter code. But understanding the manual encapsulation pattern is fundamental.

---

## 18. ADVANCED DATA STRUCTURES

### 18.1 Stack

A **Stack** follows Last-In-First-Out (LIFO) order — like a stack of plates.

```java
import java.util.Stack;
import java.util.ArrayDeque;

// Using Java's built-in Stack
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
stack.push(3);

stack.peek();    // 3 — view top without removing
stack.pop();     // 3 — remove and return top
stack.isEmpty(); // false
stack.size();    // 2

// Preferred: ArrayDeque as stack (better performance)
ArrayDeque<Integer> dequeStack = new ArrayDeque<>();
dequeStack.push(1);
dequeStack.push(2);
int top = dequeStack.pop();    // 2 (LIFO)

// Interface-style declaration from source:
// Stack()          — create an empty stack
// boolean isEmpty() — return if the stack is empty
// void push(Item)  — push item onto stack
// Item pop()       — return and remove most recently inserted item
// int size()       — number of items on stack
```

---

### 18.2 Queue

A **Queue** follows First-In-First-Out (FIFO) order — like a line at a shop.

```java
import java.util.Queue;
import java.util.LinkedList;
import java.util.ArrayDeque;

// Queue using LinkedList
Queue<String> queue = new LinkedList<>();
queue.offer("first");    // Add to back (enqueue)
queue.offer("second");
queue.offer("third");

queue.peek();    // "first" — view front without removing
queue.poll();    // "first" — remove and return front element
queue.isEmpty(); // false
queue.size();    // 2

// Queue using ArrayDeque (preferred — better performance)
Queue<Integer> dequeQueue = new ArrayDeque<>();
dequeQueue.offer(1);
dequeQueue.offer(2);
int front = dequeQueue.poll();    // 1 (FIFO)

// Interface-style declaration from source:
// Queue()             — create an empty queue
// boolean isEmpty()   — return if the queue is empty
// void enqueue(Item)  — insert item onto queue
// Item dequeue()      — return and remove least recently inserted item
// int size()          — number of items on queue
```

---

### 18.3 Iterable — Custom Collection

```java
import java.util.Iterator;

// A custom FIFO Queue that implements Iterable
public class Queue<Item> implements Iterable<Item> {

    private Node first;    // Front of queue
    private Node last;     // Back of queue

    private class Node {   // Inner node class
        Item item;
        Node next;
    }

    public void enqueue(Item item) {
        Node oldLast = last;
        last       = new Node();
        last.item  = item;
        last.next  = null;
        if (isEmpty()) first = last;
        else oldLast.next = last;
    }

    public Item dequeue() {
        Item item = first.item;
        first     = first.next;
        if (isEmpty()) last = null;
        return item;
    }

    public boolean isEmpty() { return first == null; }
    public int size()        { /* count nodes */ return 0; }

    // Required for Iterable — enables for-each loop usage
    @Override
    public Iterator<Item> iterator() {
        return new Iterator<Item>() {
            private Node current = first;

            @Override
            public boolean hasNext() { return current != null; }

            @Override
            public Item next() {
                Item item = current.item;
                current   = current.next;
                return item;
            }
        };
    }
}
```

---

### 18.4 Symbol Table (Map)

A **Symbol Table** (Map) stores key-value pairs with fast lookup by key.

```java
import java.util.Map;
import java.util.HashMap;
import java.util.TreeMap;

// HashMap — O(1) average for get/put; no ordering guarantee
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 95);        // Associate value 95 with key "Alice"
map.put("Bob", 87);
map.get("Alice");            // 95
map.remove("Bob");           // Remove key-value pair
map.containsKey("Alice");    // true
map.size();                  // 1
map.keySet();                // Set of all keys

// TreeMap — O(log n); keys sorted in natural order
Map<String, Integer> sorted = new TreeMap<>(map);
for (Map.Entry<String, Integer> e : sorted.entrySet()) {
    System.out.println(e.getKey() + ": " + e.getValue());
}

// Interface-style declaration from source:
// ST()                  — create empty symbol table
// void put(Key, Value)  — associate val with key
// Value get(Key)        — value associated with key
// void remove(Key)      — remove key and its value
// boolean contains(Key) — true if key has a value
// int size()            — number of key-value pairs
// Iterable<Key> keys()  — all keys in the table
```

---

### 18.5 Set

A **Set** stores unique keys with no duplicates and supports fast membership testing.

```java
import java.util.Set;
import java.util.HashSet;
import java.util.TreeSet;

// HashSet — O(1) average; no ordering
Set<String> set = new HashSet<>();
set.add("apple");
set.add("banana");
set.add("apple");        // Duplicate — silently ignored
set.isEmpty();           // false
set.contains("apple");   // true
set.remove("banana");
set.size();              // 1

// TreeSet — sorted natural order
Set<Integer> sorted = new TreeSet<>();
sorted.add(5);
sorted.add(1);
sorted.add(3);
// Iterating yields: 1, 3, 5

// Interface-style declaration from source:
// Set()                 — create empty set
// boolean isEmpty()     — true if no elements
// void add(Key)         — add key to the set
// void remove(Key)      — remove key from set
// boolean contains(Key) — true if key is in the set
// int size()            — number of elements
```

---

## 19. KEY CONCEPTS & LEARNER TAKEAWAYS

### 19.1 Java vs Other Languages

|Feature|Java|C|C#|Python|
|---|---|---|---|---|
|Memory management|Garbage Collector (GC)|Manual (`malloc`/`free`)|GC|GC|
|Type system|Static, strong, explicit|Static, weak|Static, strong|Dynamic, strong|
|OOP|Class-based, single inheritance|Structs only|Class-based|Class-based|
|Compilation|To JVM bytecode (.class)|To native machine code|To CLR bytecode|Interpreted|
|Null safety|Null is the default — NPE risk|Pointer null — UB|Nullable types (C# 8+)|`None`|
|String comparison|`.equals()` for content; `==` for reference|`strcmp()`|`==` (overloaded)|`==`|
|Arrays|Fixed-size, bounds-checked|Fixed-size, no bounds check|Fixed-size, bounds-checked|Dynamic lists|
|Platform|"Write once, run anywhere" (JVM)|Platform-specific binary|.NET CLR|Platform-neutral|
|Multiple inheritance|Via interfaces only|No classes|Via interfaces only|Full multiple inheritance|

---

### 19.2 Common Pitfalls

|Mistake|Problem|Fix|
|---|---|---|
|`==` on String objects|Compares references, not content — `"hello" == "hello"` may be `true` or `false`|Always use `.equals()`: `s1.equals(s2)`|
|NullPointerException|Calling a method on a null reference|Check for null before use; use `Optional<T>`|
|Forgetting `break` in `switch`|Fall-through to next case — silent logic bug|Always add `break`; use modern arrow-syntax switch|
|Array index out of bounds|Accessing `arr[arr.length]` or negative index|Check bounds; use `arr.length - 1` as max valid index|
|Integer overflow|`int` silently wraps around past 2,147,483,647|Use `long` for large values; use `Math.addExact()` to detect overflow|
|Float/double precision|`0.1 + 0.2 != 0.3` in floating point|Use `BigDecimal` for exact decimal arithmetic (financial)|
|Mutable static fields|Shared across all instances — threading bugs|Minimise static mutable state; use `final` where possible|
|Raw types|`List list = new ArrayList()` — no type safety|Always use generics: `List<String> list = new ArrayList<>()`|

---

### 19.3 Quick Reference — Essential Snippets

```java
// Null-safe string comparison
"expected".equals(variable);    // Safe — no NPE even if variable is null

// instanceof check before cast
if (shape instanceof Circle c) {    // Pattern matching instanceof (Java 16+)
    c.draw();
}

// Enhanced switch expression
String result = switch (day) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> "Weekday";
    case SATURDAY, SUNDAY -> "Weekend";
};

// Try-with-resources — auto-closes resources
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// Generics
public <T extends Comparable<T>> T findMax(T[] arr) {
    T max = arr[0];
    for (T item : arr) {
        if (item.compareTo(max) > 0) max = item;
    }
    return max;
}

// Lambda and Stream API (Java 8+)
List<String> names   = List.of("Bob", "Alice", "Charlie");
List<String> sorted  = names.stream()
                            .filter(n -> n.length() > 3)
                            .sorted()
                            .collect(Collectors.toList());
// ["Alice", "Charlie"]

int total = IntStream.rangeClosed(1, 100).sum();    // 5050

// Optional — handle absence without null
Optional<String> opt = Optional.ofNullable(getValue());
String value = opt.orElse("default");
opt.ifPresent(v -> System.out.println(v));
```

---

### 19.4 Standard Library Quick Reference

```java
// Core
import java.lang.*;                  // Auto-imported: String, Math, Object, System, Thread
import java.util.*;                  // Collections: List, Map, Set, Queue, Arrays, Collections

// Collections
import java.util.ArrayList;          // Dynamic array
import java.util.LinkedList;         // Doubly-linked list
import java.util.HashMap;            // Hash map (key-value)
import java.util.TreeMap;            // Sorted map
import java.util.HashSet;            // Unique elements (unordered)
import java.util.TreeSet;            // Unique elements (sorted)
import java.util.PriorityQueue;      // Min-heap priority queue
import java.util.ArrayDeque;         // Double-ended queue / stack

// Streams and Functional (Java 8+)
import java.util.stream.*;           // Stream, Collectors, IntStream
import java.util.function.*;         // Function, Predicate, Consumer, Supplier
import java.util.Optional;           // Optional value container

// I/O
import java.io.*;                    // File, Stream, Reader, Writer
import java.nio.file.*;              // Path, Files (modern I/O)
import java.nio.charset.StandardCharsets;

// Concurrency
import java.util.concurrent.*;       // ExecutorService, Future, CompletableFuture
import java.util.concurrent.atomic.*; // AtomicInteger, AtomicReference

// Networking
import java.net.*;                   // URL, HttpURLConnection, Socket

// Utilities
import java.time.*;                  // LocalDate, LocalDateTime, Duration (Java 8+)
import java.math.BigDecimal;         // Exact decimal arithmetic
import java.util.regex.*;            // Pattern, Matcher — regular expressions
```
