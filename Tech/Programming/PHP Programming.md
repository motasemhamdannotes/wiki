

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

> **Domain:** Server-Side Web Development | PHP Language Fundamentals | OOP | Regex  
> **Relevance:** Web Development, WordPress/Laravel/Symfony, Security Research (PHP is the most common backend language in pentesting targets), OSCP Web Modules, Bug Bounty

## 1. PROGRAM STRUCTURE & OUTPUT

### 1.1 PHP Tags and Script Termination

All PHP code lives inside `<?php ... ?>` tags. PHP files served as web pages typically mix PHP and HTML. Scripts can be terminated early with `die()` or `exit()`.

```php
<?php
// Both die() and exit() halt script execution immediately
// Any string argument is echo'd before stopping
die("This file is not meant to be run.");
exit("Stopping execution here.");
?>
```

> **Note:** `die()` is an alias for `exit()` — they behave identically. Both accept an optional string (which is printed) or an integer (used as the exit status code, accessible by the shell). Use `die()` defensively in files that should never be executed directly (e.g., configuration files, class libraries without a router).

---

### 1.2 Output Functions

PHP has three primary output mechanisms — each suited to different debugging and display scenarios.

```php
// echo — print a string or a type castable to string (int, float)
// Fastest output method; not a true function (no parentheses required)
echo "Hello, World!";
echo 42;
echo 3.14;
echo "Value: " . $variable;    // String concatenation with .

// print_r() — print human-readable representation of any value
// Best for arrays and objects — shows structure with keys and values
$arr = ["a" => 1, "b" => 2];
print_r($arr);
// Output:
// Array ( [a] => 1 [b] => 2 )

// Capture print_r output as string instead of printing it
$output = print_r($arr, true);

// var_dump() — most verbose output
// Shows type, size, and value for every element and nested structure
var_dump($arr);
// Output:
// array(2) {
//   ["a"] => int(1)
//   ["b"] => int(2)
// }

var_dump("hello");    // string(5) "hello"
var_dump(42);         // int(42)
var_dump(true);       // bool(true)
var_dump(null);       // NULL

// var_export() — outputs valid PHP code that can be eval()'d
var_export($arr);    // array ( 'a' => 1, 'b' => 2, )
```

**Which to use:**

|Function|Best For|Shows Types|Shows Keys|Performance|
|---|---|---|---|---|
|`echo`|Output to browser/user|No|No|Fastest|
|`print_r()`|Debugging arrays/objects|Partial|Yes|Fast|
|`var_dump()`|Deep debugging — all types and sizes|Yes (full)|Yes|Slower|
|`var_export()`|Generating PHP code from data|Yes|Yes|Slow|

---

## 2. STRING MANIPULATION

PHP is heavily used for web content — string manipulation is one of its most frequently used capabilities.

### 2.1 Core String Functions

```php
$string = 'Awesome cheatsheets';

// --- SEARCH ---
// str_contains() — check if string contains a substring (PHP 8.0+)
str_contains($string, 'cheat');         // true
str_contains($string, 'xyz');           // false

// strpos() — find position of first occurrence (returns false if not found)
strpos($string, 'a', 0);               // 1 (case-sensitive)
stripos($string, 'A', 0);              // 0 (case-insensitive)
strrpos($string, 'e');                 // 18 (last occurrence)

// str_starts_with() / str_ends_with() (PHP 8.0+)
str_starts_with($string, 'Awesome');   // true
str_ends_with($string, 'sheets');      // true

// --- COMPARE ---
// strcmp() — returns 0 if equal, negative if str1 < str2, positive if str1 > str2
strcmp($string, 'Awesome cheatsheets');    // 0 (strings are equal)
strcmp('a', 'b');                          // negative
strcmp('b', 'a');                          // positive
strcasecmp($string, 'AWESOME cheatsheets'); // 0 (case-insensitive)

// --- MODIFY ---
// str_replace() — replace all occurrences
str_replace('Awesome', 'Bonjour', $string);   // 'Bonjour cheatsheets'
str_ireplace('awesome', 'Hi', $string);        // Case-insensitive replace

// strrev() — reverse a string
strrev($string);    // 'steehs taehc emosewA'

// trim() — remove whitespace (or specified characters) from both ends
trim($string);            // removes spaces from start and end
ltrim($string);           // trim left only
rtrim($string);           // trim right only
trim($string, "Ae");      // remove 'A' and 'e' from both ends

// ucfirst() / lcfirst() — change case of first character
ucfirst('hello world');   // 'Hello world'
lcfirst('Hello World');   // 'hello World'
ucwords('hello world');   // 'Hello World' — capitalise each word
strtoupper($string);      // 'AWESOME CHEATSHEETS'
strtolower($string);      // 'awesome cheatsheets'

// --- EXTRACT ---
// substr() — extract a portion of a string
substr($string, 0, 4);    // 'Awes' — 4 chars from position 0
substr($string, 8);       // 'cheatsheets' — from position 8 to end
substr($string, -6);      // 'sheets' — 6 chars from the end

// str_split() — split into array of chunks
str_split($string, 2);    // ['Aw', 'es', 'om', 'e ', 'ch', 'ea', ...]
str_split($string);       // Array of individual characters

// --- MEASURE ---
strlen($string);           // 19 — number of bytes (not Unicode characters)
mb_strlen($string, 'UTF-8'); // Unicode-safe character count

// --- FORMAT ---
sprintf("Name: %s, Age: %d", "Alice", 30);   // 'Name: Alice, Age: 30'
number_format(1234567.891, 2, '.', ',');       // '1,234,567.89'
nl2br("Line 1\nLine 2");                       // 'Line 1<br />Line 2'
htmlspecialchars('<script>alert(1)</script>');  // Escapes HTML entities
htmlspecialchars_decode('&lt;b&gt;text&lt;/b&gt;'); // Decodes HTML entities
strip_tags('<p>Hello <b>World</b></p>');        // 'Hello World'

// --- PADDING ---
str_pad('42', 5, '0', STR_PAD_LEFT);    // '00042'
str_repeat('ab', 3);                     // 'ababab'
wordwrap($string, 10, "\n", true);       // Wrap at 10 characters
```

---

## 3. ARRAYS

### 3.1 Declaring Arrays

PHP supports three array styles — indexed, associative (key-value), and multidimensional — all using the same `array` type.

```php
// --- INDEXED ARRAY (numeric keys 0, 1, 2, ...) ---
$arr = array("John", "Doe", "Lorem", "Ipsum");

// Short syntax (PHP 5.4+) — preferred
$arr = ["John", "Doe", "Lorem", "Ipsum"];

// Access elements
echo $arr[0];    // "John"
echo $arr[3];    // "Ipsum"

// --- ASSOCIATIVE ARRAY (string keys) ---
$arr = array("John" => 10, "Doe" => 200, "Lorem" => 3000, "Ipsum" => 40000);

// Short syntax
$arr = ["John" => 10, "Doe" => 200, "Lorem" => 3000, "Ipsum" => 40000];

// Access by key
echo $arr["Doe"];    // 200

// Trailing comma is allowed (avoids syntax errors when adding items)
$arr = [
    "first"  => "value1",
    "second" => "value2",    // trailing comma is fine
];

// --- MULTIDIMENSIONAL ARRAY ---
$arr = [
    ["John",  100, 180],
    ["Doe",   150, 130],
    ["Lorem", 500, 200],
    ["Ipsum", 170, 150],
];

echo $arr[1][0];    // "Doe"
echo $arr[2][2];    // 200
```

---

### 3.2 Array Operations

```php
// --- SORTING ---
sort($arr);     // Sort indexed array ascending (reindexes keys)
rsort($arr);    // Sort indexed array descending (reindexes keys)
asort($arr);    // Sort associative array ascending by VALUE (preserves keys)
arsort($arr);   // Sort associative array descending by VALUE (preserves keys)
ksort($arr);    // Sort associative array ascending by KEY
krsort($arr);   // Sort associative array descending by KEY
usort($arr, fn($a, $b) => $a <=> $b);  // Custom sort with comparison function

// --- MANIPULATION ---
array_push($arr, "newValue");           // Add to end
array_pop($arr);                        // Remove from end, return it
array_shift($arr);                      // Remove from beginning, return it
array_unshift($arr, "first");           // Add to beginning

array_merge($arr1, $arr2);             // Merge two arrays (reindexes numeric keys)
array_combine($keys, $values);          // Create array from keys array + values array
array_slice($arr, 1, 3);               // Extract 3 elements starting at index 1
array_splice($arr, 1, 2, ["new"]);     // Remove 2 at index 1 and insert "new"

// --- SEARCH ---
in_array("John", $arr);                // true if value exists
array_search("John", $arr);            // Returns key of first matching value, or false
array_key_exists("key", $arr);         // true if key exists (safe for null values)
isset($arr["key"]);                     // true if key exists AND value is not null

// --- INFORMATION ---
count($arr);                            // Number of elements
array_keys($arr);                       // Array of all keys
array_values($arr);                     // Array of all values (reindexed)
array_unique($arr);                     // Remove duplicate values
array_flip($arr);                       // Swap keys and values
array_reverse($arr);                    // Reverse element order

// --- HIGHER-ORDER FUNCTIONS ---
array_map(fn($x) => $x * 2, $arr);    // Apply function to each element
array_filter($arr, fn($x) => $x > 0); // Keep elements where function returns true
array_reduce($arr, fn($carry, $item) => $carry + $item, 0); // Reduce to single value

// --- JOINING / SPLITTING ---
implode(", ", $arr);                    // Join array into string: "John, Doe, Lorem"
explode(",", "a,b,c");                 // Split string into array: ["a", "b", "c"]
```

---

## 4. VARIABLES & CONSTANTS

```php
// Variable declaration — prefix with $
$name    = "Alice";
$age     = 30;
$price   = 19.99;
$active  = true;
$nothing = null;

// Variable variables — variable whose name is stored in another variable
$varName = "greeting";
$$varName = "Hello";
echo $greeting;    // "Hello"

// Constants — defined once, never change, no $ prefix
define('APP_NAME', 'MyApp');         // Runtime constant
const MAX_SIZE = 1024;               // Compile-time constant (in class/global scope)

echo APP_NAME;    // "MyApp"
echo MAX_SIZE;    // 1024

// Type checking
gettype($name);       // "string"
is_string($name);     // true
is_int($age);         // true
is_float($price);     // true
is_bool($active);     // true
is_null($nothing);    // true
is_array($arr);       // true

// Type casting
$num = (int) "42abc";      // 42
$flt = (float) "3.14xyz";  // 3.14
$str = (string) 100;       // "100"
$boo = (bool) 0;           // false
$boo = (bool) 1;           // true
$arr = (array) "hello";    // ["hello"]

// Null coalescing — return value if set and not null, else default
$value = $variable ?? "default";
$chain = $a ?? $b ?? $c ?? "fallback";  // Chain multiple

// Null coalescing assignment (PHP 7.4+)
$arr['key'] ??= "default_value";    // Assigns only if not already set
```

---

## 5. OPERATORS

```php
// --- ARITHMETIC ---
$sum  = 5 + 3;      // 8
$diff = 5 - 3;      // 2
$prod = 5 * 3;      // 15
$quot = 10 / 3;     // 3.333...
$mod  = 10 % 3;     // 1
$pow  = 2 ** 8;     // 256 (exponentiation)

// --- STRING ---
$concat = "Hello" . " " . "World";     // "Hello World"
$str    .= " More";                     // Append: "Hello World More"

// --- COMPARISON ---
5 == "5";      // true  — loose comparison (type coercion)
5 === "5";     // false — strict comparison (type AND value)
5 != "5";      // false — loose not-equal
5 !== "5";     // true  — strict not-equal
5 <=> 3;       // 1 (spaceship: -1, 0, or 1)

// --- LOGICAL ---
true && false;    // false — AND
true || false;    // true  — OR
!true;            // false — NOT
true and false;   // false (lower precedence than &&)
true or false;    // true  (lower precedence than ||)
true xor false;   // true  (exclusive OR)

// --- ASSIGNMENT ---
$x  = 5;
$x += 3;    // $x = 8
$x -= 2;    // $x = 6
$x *= 4;    // $x = 24
$x /= 6;    // $x = 4
$x %= 3;    // $x = 1
$x **= 3;   // $x = 1

// --- INCREMENT / DECREMENT ---
$i++;    // Post-increment (use then increment)
++$i;    // Pre-increment (increment then use)
$i--;    // Post-decrement
--$i;    // Pre-decrement

// --- TERNARY ---
$result = ($x > 0) ? "positive" : "not positive";

// Shorthand ternary (Elvis operator)
$name = $input ?: "Anonymous";    // Use $input if truthy, else "Anonymous"
```

---

## 6. CONDITIONAL STATEMENTS

### 6.1 `if` / `elseif` / `else`

```php
$i = 50;

if ($i > 100) {
    echo "Greater than 100";
} elseif ($i > 10) {
    echo "Greater than 10";    // Executes
} else {
    echo "10 or less";
}

// Single-line shorthand (omit braces for one statement)
if ($i > 0) echo "Positive";

// Alternative syntax (useful when mixing with HTML)
if ($condition): ?>
    <p>Condition is true</p>
<?php else: ?>
    <p>Condition is false</p>
<?php endif; ?>
```

---

### 6.2 Ternary and Null Coalescing

```php
// Ternary — inline if-else
$state = 'Running';
$message = ($state == 'Running') ? 'He is running' : 'I don\'t know';

// Null coalescing — return right side only if left is null or unset
$startDate = null;
$display = $startDate ?? '';    // '' (because $startDate is null)

// Chained null coalescing
$result = $a ?? $b ?? $c ?? "final fallback";
```

---

### 6.3 `switch` Statement

```php
$color = "blue";

switch ($color) {
    case "red":
        echo "Stop";
        break;    // Required — PHP switch falls through without break
    case "yellow":
        echo "Caution";
        break;
    case "blue":
    case "green":     // Multiple cases — same action
        echo "Go";
        break;
    default:
        echo "Unknown color";
}
```

---

### 6.4 `match` Expression (PHP 8.0+)

`match` is a stricter, more powerful alternative to `switch`. It uses strict comparison (`===`), does not fall through, and is an expression (returns a value).

```php
$food = 'apple';

$result = match($food) {
    'apple', 'appel' => 'An apple',      // Multiple match arms
    'banana'         => 'A banana',
    'applepie'       => 'An applepie',
    default          => 'A fruit'
};
// $result = 'An apple'

// match(true) — use match as a conditional (replaces if-elseif chains)
$str = 'Welcome to awesome cheatsheets';

$language = match(true) {
    str_contains($str, 'Welcome') && str_contains($str, 'to') => 'en-EN',
    str_contains($str, 'Bonjour') && str_contains($str, 'sur') => 'fr-FR',
    default => throw new Exception('Language not recognized')
    // Note: match arms can throw exceptions (PHP 8.0+)
};
```

**`switch` vs `match` comparison:**

|Feature|`switch`|`match`|
|---|---|---|
|Comparison type|Loose (`==`)|Strict (`===`)|
|Fall-through|Yes (requires `break`)|No (never falls through)|
|Return value|No (statement)|Yes (expression)|
|Multiple conditions|Yes (`case` stacking)|Yes (comma-separated)|
|Throw in arm|No|Yes (PHP 8.0+)|

---

## 7. LOOPS

```php
// --- FOREACH — iterate over arrays (most common in PHP) ---
$arr = ["apple", "banana", "cherry"];

foreach ($arr as $value) {
    echo $value;
}

// With key
foreach ($arr as $key => $value) {
    echo "$key: $value\n";
}

// Modify values by reference
foreach ($arr as &$value) {
    $value = strtoupper($value);
}
unset($value);    // IMPORTANT: unset reference after loop to avoid bugs

// --- FOR — counted loop ---
for ($i = 0; $i < count($arr); $i++) {
    echo $arr[$i];
}

// --- WHILE — condition-checked before each iteration ---
$i = 0;
while ($i < count($arr) - 1) {
    echo $arr[$i];
    $i++;
}

// --- DO-WHILE — body always executes at least once ---
$i = 0;
do {
    echo $arr[$i];
    $i++;
} while ($i < count($arr));

// --- LOOP CONTROL ---
continue;    // Skip the current iteration and move to the next
break;       // Exit the loop entirely

// Break/continue with levels (nested loops)
for ($i = 0; $i < 5; $i++) {
    for ($j = 0; $j < 5; $j++) {
        if ($j == 2) break 2;    // Break out of both loops
    }
}
```

---

## 8. SUPERGLOBALS & GLOBAL VARIABLES

PHP's superglobals are built-in associative arrays always available in all scopes.

```php
// Server and execution environment info
$_SERVER['PHP_SELF'];           // Current script filename
$_SERVER['REQUEST_METHOD'];     // 'GET', 'POST', etc.
$_SERVER['HTTP_HOST'];          // The Host: header value
$_SERVER['REMOTE_ADDR'];        // Client IP address
$_SERVER['HTTP_USER_AGENT'];    // Browser user-agent string
$_SERVER['QUERY_STRING'];       // URL query string

// HTTP GET parameters (from URL query string)
$_GET['page'];           // e.g., from ?page=2
$_GET['search'];         // e.g., from ?search=hello

// HTTP POST parameters (from HTML form submission)
$_POST['username'];
$_POST['password'];

// All request parameters — GET + POST + COOKIE combined
$_REQUEST['username'];    // Less secure; prefer $_GET or $_POST explicitly

// All global variables — access globals inside functions without 'global' keyword
$GLOBALS['myVar'];

// Session data — persists across requests for the same user
session_start();          // Must call before using $_SESSION
$_SESSION['user_id'] = 123;
$_SESSION['username'] = "Alice";
$user = $_SESSION['user_id'];
unset($_SESSION['user_id']);    // Remove a session variable
session_destroy();             // Destroy the entire session

// Uploaded files from an HTML <input type="file"> form
$_FILES['photo']['name'];         // Original filename
$_FILES['photo']['type'];         // MIME type (e.g., 'image/jpeg')
$_FILES['photo']['size'];         // File size in bytes
$_FILES['photo']['tmp_name'];     // Temp path on server
$_FILES['photo']['error'];        // Error code (0 = no error)

// Cookies sent in the HTTP request
$_COOKIE['user_pref'];
setcookie('user_pref', 'dark_mode', time() + 86400, '/');  // Set a cookie

// PHP.ini settings and environment variables
$_ENV['DB_PASSWORD'];     // From environment variables
$_ENV['APP_ENV'];

// Command-line arguments (when running PHP from CLI)
$argv[0];    // Script filename
$argv[1];    // First argument
$argc;       // Total number of arguments

// Access global variable inside a function
$globalVar = "I am global";
function useGlobal() {
    global $globalVar;    // Declare intent to use global
    echo $globalVar;
}
```

> **Security Note:** Never use superglobal input (`$_GET`, `$_POST`, `$_REQUEST`, `$_COOKIE`) directly in SQL queries, HTML output, or file operations. Always validate and sanitise: use `filter_input()`, `htmlspecialchars()`, and prepared statements.

---

## 9. FUNCTIONS

### 9.1 Function Declaration and Types

```php
// Simple function — no return type
function sayHello($name) {
    echo "Hello, $name!";
}
sayHello("Alice");    // "Hello, Alice!"

// Function with return type declaration
function add(int $a, int $b): int {
    return $a + $b;
}
add(3, 4);    // 7

// Return types: void, int, float, string, bool, array, object, mixed, self, static
function doNothing(): void {
    // Cannot return a value
}

// Optional parameter with default value
function greet(string $name, string $greeting = 'Hello'): string {
    return "$greeting, $name!";
}
greet("Bob");            // "Hello, Bob!"
greet("Bob", "Hi");      // "Hi, Bob!"

// Nullable parameter — ? means "this type or null"
function findUser(?string $id): ?string {
    if ($id === null) return null;
    return "User-$id";
}
findUser(null);     // null
findUser("42");     // "User-42"

// Union types (PHP 8.0+) — accept multiple types
function process(int|string $param1, array $param2): int|string {
    return is_int($param1) ? $param1 * 2 : strtoupper($param1);
}

// Variadic functions — accept any number of arguments
function sumAll(int ...$numbers): int {
    return array_sum($numbers);
}
sumAll(1, 2, 3, 4, 5);    // 15

// Type declarations reduce bugs — enable strict types at top of file
declare(strict_types=1);    // Must be first statement in file
```

---

### 9.2 Anonymous Functions (Closures) and Arrow Functions

```php
// Anonymous function — can be assigned to a variable or passed as argument
$multiply = function(int $x, int $y): int {
    return $x * $y;
};
echo $multiply(3, 4);    // 12

// Closure — anonymous function that captures outer variables with 'use'
$factor = 5;
$multiplyByFactor = function(int $x) use ($factor): int {
    return $x * $factor;
};
echo $multiplyByFactor(6);    // 30

// Capture by reference — modifications inside affect the outer variable
$counter = 0;
$increment = function() use (&$counter): void {
    $counter++;
};
$increment();
$increment();
echo $counter;    // 2

// Arrow function (PHP 7.4+) — single-expression closures; auto-captures outer scope
$factor = 3;
$triple = fn($x) => $x * $factor;    // $factor is captured automatically
echo $triple(7);    // 21

// Using closures as callbacks
$numbers = [3, 1, 4, 1, 5, 9, 2, 6];
$evens   = array_filter($numbers, fn($n) => $n % 2 === 0);    // [4, 2, 6]
$doubled = array_map(fn($n) => $n * 2, $numbers);             // [6, 2, 8, ...]
usort($numbers, fn($a, $b) => $a <=> $b);                     // Sort ascending
```

---

### 9.3 Null-Safe Operator (PHP 8.0+)

```php
// Without null-safe — verbose null checking required
$city = null;
if ($user !== null) {
    if ($user->getAddress() !== null) {
        $city = $user->getAddress()->getCity();
    }
}

// With null-safe operator — short-circuit on null; returns null without error
$city = $user?->getAddress()?->getCity();

// Chaining
$result = $object?->getChild()?->getName()?->startWith('A');
// Returns null if any step in the chain is null
```

---

## 10. OBJECT-ORIENTED PROGRAMMING

### 10.1 Class Declaration

```php
class NormalClass extends AbstractClassName implements InterfaceName
{
    use TraitName;    // Include trait functionality

    // --- VISIBILITY MODIFIERS ---
    public    $publicProp;      // Accessible everywhere
    private   $privateProp;     // Accessible only within this class
    protected $protectedProp;   // Accessible within this class and subclasses
    static    $staticProp;      // Shared across all instances; access as ClassName::$staticProp

    // Typed properties (PHP 7.4+)
    public string $name;
    private int $age = 0;
    protected ?string $email = null;    // Nullable typed property

    // Constructor property promotion (PHP 8.0+)
    public function __construct(
        public readonly string $id,     // Promotes parameter to property
        private string $name,
        protected int $age = 0
    ) {}
}
```

---

### 10.2 Method Types

```php
// Public method — callable from anywhere
public function publicFunction(Type $var = null): Type {}

// Private method — callable only from within this class
private function privateFunction(Type $var = null): Type {}

// Protected method — callable from this class and subclasses
protected function protectedFunction(Type $var = null): Type {}

// Static method — callable without an instance; cannot use $this
public static function staticFunction(Type $var = null): Type {}

// Call static method
ClassName::staticFunction($arg);
self::staticFunction($arg);       // From within the class
parent::staticFunction($arg);     // From within a subclass

// Instantiate and use object
$obj = new NormalClass($arg1, $arg2);
$obj->publicFunction($arg);
```

---

### 10.3 Magic Methods

Magic methods are automatically called by PHP in specific situations. They begin with `__` (double underscore).

```php
class MagicClass
{
    // Called when a new instance is created — constructor
    public function __construct(Type $var = null) {}

    // Called when the object is destroyed — destructor
    public function __destruct() {}

    // Called when writing to inaccessible/non-existent properties
    public function __set(string $name, mixed $value): void {}

    // Called when reading inaccessible/non-existent properties
    public function __get(string $name): mixed {}

    // Called when isset() or empty() is called on inaccessible properties
    public function __isset(string $name): bool {}

    // Called when unset() is called on inaccessible properties
    public function __unset(string $name): void {}

    // Called when invoking inaccessible methods in object context
    public function __call(string $name, array $arguments): mixed {}

    // Called when invoking inaccessible methods in static context
    public static function __callStatic(string $name, array $arguments): mixed {}

    // Called when serialize() is used — returns properties to serialise
    public function __sleep(): array {}

    // Called when unserialize() is used — restores object state
    public function __wakeup(): void {}

    // Called when object is cast to string: echo $obj or (string)$obj
    public function __toString(): string { return "MyClass"; }

    // Called when object is used as a function: $obj($arg)
    public function __invoke(Type $var = null): mixed {}

    // Called by var_export() — reconstruct object from exported string
    public static function __set_state(array $properties): object {}

    // Called by var_dump() — control what debug info is shown
    public function __debugInfo(): array {}
}
```

**Magic methods quick reference:**

|Method|Triggered By|
|---|---|
|`__construct`|`new ClassName()`|
|`__destruct`|Object goes out of scope or `unset($obj)`|
|`__get` / `__set`|Accessing/writing undefined or private properties|
|`__isset` / `__unset`|`isset()` / `unset()` on inaccessible properties|
|`__call` / `__callStatic`|Calling undefined or inaccessible methods|
|`__toString`|`echo $obj`, string cast, or string context|
|`__invoke`|`$obj(args)` — calling an object as function|
|`__sleep` / `__wakeup`|`serialize()` / `unserialize()`|
|`__clone`|`clone $obj` — deep copy customisation|

---

### 10.4 Interfaces, Abstract Classes, and Traits

```php
// INTERFACE — defines a contract; all implementing classes must have these methods
interface InterfaceName
{
    public function functionName(Type $var = null): Type;
    // All methods in an interface are implicitly public and abstract
}

// ABSTRACT CLASS — mix of interface and class; may have concrete methods
abstract class AbstractClassName
{
    // Subclasses MUST implement abstract methods
    abstract function abstractFunction(Type $var = null): Type;

    // Can also have concrete methods
    public function concreteMethod(): string {
        return "I have a body";
    }
}

// Implementing interface and extending abstract class
class ConcreteClass extends AbstractClassName implements InterfaceName
{
    // Must implement all abstract and interface methods
    public function abstractFunction(Type $var = null): Type {}
    public function functionName(Type $var = null): Type {}
}

// TRAIT — reusable code blocks; "mixins" for PHP
trait LoggerAwareTrait
{
    protected $logger;

    public function setLogger(LoggerInterface $logger): void
    {
        $this->logger = $logger;
    }
}

// Use a trait in a class
class ClassWithLogger
{
    use LoggerAwareTrait;    // Imports all trait methods and properties
}

$obj = new ClassWithLogger();
$obj->setLogger($someLogger);    // Method from the trait
```

**Key differences:**

|Feature|Interface|Abstract Class|Trait|
|---|---|---|---|
|Multiple inheritance|Yes (implement many)|No (extend one)|Yes (use many)|
|Concrete methods|No (PHP 8+ allows default)|Yes|Yes|
|Properties|No|Yes|Yes|
|Constructor|No|Yes|No (avoid constructors in traits)|
|Purpose|Define contract|Partial implementation|Code reuse|

---

## 11. ENUMS (PHP 8.1+)

Enums define a fixed set of named cases — replacing ad-hoc constants with a type-safe alternative.

```php
// Basic (Pure) Enum
enum Status {
    case Active;
    case Inactive;
    case Pending;
}

$s = Status::Active;
echo $s->name;    // "Active"

// Backed Enum — each case has a scalar value (int or string)
enum Status: string {
    case Active   = 'active';
    case Inactive = 'inactive';
    case Pending  = 'pending';
}

$s = Status::Active;
echo $s->value;    // "active"
echo $s->name;     // "Active"

// Create from value
$s = Status::from('active');         // Status::Active (throws on invalid)
$s = Status::tryFrom('invalid');     // null (safe version)

// Int-backed Enum
enum Priority: int {
    case Low    = 1;
    case Medium = 2;
    case High   = 3;
}

// Enum implementing an interface
interface StateCode {
    public function stateCode(): int;
}

enum States: int implements StateCode {
    case Running = 1;
    case Stopped = 0;

    public function stateCode(): int {
        return match($this) {
            States::Running => 444,
            States::Stopped => 666,
        };
    }
}

// Use enum as type hint
function notify(States $state): void {
    echo $state->stateCode();
}

notify(States::Running);    // 444

// Get all cases
$cases = States::cases();    // [States::Running, States::Stopped]

// Enums in match
$result = match($state) {
    States::Running => "System is running",
    States::Stopped => "System is stopped",
};
```

---

## 12. REGULAR EXPRESSIONS

### 12.1 Regex Meta Characters

```
^       Start of subject (or line in multiline mode)
$       End of subject (or line in multiline mode)
[...]   Character class definition
|       Alternation: (a|b) matches 'a' or 'b'
(...)   Subpattern grouping
\       Escape character
.       Any character except newline (unless dotall mode)
```

---

### 12.2 Pattern Modifiers

```
i   Caseless — case-insensitive matching
m   Multiline — ^ and $ match start/end of each line
s   Dotall — . matches newline too
x   Extended — allow whitespace and comments in pattern
S   Extra analysis — JIT optimisation for repeated use
U   Ungreedy — make quantifiers non-greedy by default
u   Unicode — treat pattern and subject as UTF-8
```

---

### 12.3 Subpattern Modifiers and Assertions

```
(?:...)    Non-capturing group — group without capturing: (?:foo|bar)baz
(?=...)    Positive lookahead — foo(?=bar) matches 'foo' only if followed by 'bar'
(?!...)    Negative lookahead — foo(?!bar) matches 'foo' only if NOT followed by 'bar'
(?<=...)   Positive lookbehind — (?<=foo)bar matches 'bar' only if preceded by 'foo'
(?<!...)   Negative lookbehind — (?<!foo)bar matches 'bar' only if NOT preceded by 'foo'
(?>...)    Atomic group — no backtracking: (?>\\d+)bar
(?#...)    Comment — inline comment in pattern
```

---

### 12.4 Character Classes

```
\w    Any word character: [a-zA-Z0-9_]
\W    Any non-word character
\s    Whitespace: space, tab, carriage return, newline
\S    Any non-whitespace character
\d    Digits: [0-9]
\D    Any non-digit character
.     Any character except newline (unless s modifier)
```

---

### 12.5 Quantifiers

```
n*       Zero or more of n (greedy)
n+       One or more of n (greedy)
n?       Zero or one of n
{n}      Exactly n occurrences
{n,}     At least n occurrences
{,m}     At most m occurrences
{n,m}    Between n and m occurrences (inclusive)
n*?      Zero or more of n (lazy — minimal match)
n+?      One or more of n (lazy)
```

---

### 12.6 PHP Regex Functions

```php
// preg_match() — check if pattern matches; returns 1 (match) or 0 (no match)
// Optionally captures matched groups into $matches
$result = preg_match('/pattern/flags', $subject, $matches);

// preg_match_all() — find ALL matches; returns count of matches
$count = preg_match_all('/pattern/i', $subject, $matches);

// preg_replace() — replace matches with replacement string
$new = preg_replace('/pattern/', 'replacement', $subject);

// preg_replace with callback
$new = preg_replace_callback('/\d+/', fn($m) => $m[0] * 2, "Buy 3 items");
// "Buy 6 items"

// preg_split() — split string by pattern (like explode but with regex)
$parts = preg_split('/[\s,]+/', "one two,three  four");
// ["one", "two", "three", "four"]

// preg_grep() — filter array — return elements matching pattern
$matches = preg_grep('/^[0-9]+$/', $array);    // Only numeric strings

// preg_quote() — escape special regex characters in a string (for use in patterns)
$escaped = preg_quote('$3.99 (inc. tax)', '/');
// '\$3\.99 \(inc\. tax\)'
```

---

### 12.7 Practical Regex Code Snippets

```php
// Validate email address — use filter_var (more reliable than DIY regex)
if (filter_var('user@example.com', FILTER_VALIDATE_EMAIL)) {
    echo "Valid email";
} else {
    echo "Invalid email format";
}

// Validate username — alphanumeric + underscore, 5-20 characters
$username = "user_name12";
if (preg_match('/^[a-z\d_]{5,20}$/i', $username)) {
    echo "Valid username";
} else {
    echo "Invalid username";
}

// Validate URL (http, https, or ftp)
$url = "https://domain-name.com/";
if (preg_match('/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i', $url)) {
    echo "Valid URL";
}

// Extract domain name from a URL
$url = "http://domain-name.com/index.html";
preg_match('@^(?:http://)?([^/]+)@i', $url, $matches);
$host = $matches[1];
echo $host;    // "domain-name.com"

// Highlight / replace a specific word in text
$text = "A regular expression (regex) is a sequence of characters...";
$highlighted = preg_replace('/\b(regex)\b/i', '<strong>$1</strong>', $text);
echo $highlighted;    // Wraps 'regex' in <strong> tags

// Validate IPv4 address
$ip = "192.168.1.1";
if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
    echo "Valid IPv4";
}

// Extract all URLs from text
$text = "Visit https://example.com and http://test.org for more info.";
preg_match_all('/https?:\/\/[^\s]+/', $text, $matches);
print_r($matches[0]);    // ["https://example.com", "http://test.org"]
```

---

## 13. KEY CONCEPTS & LEARNER TAKEAWAYS

### 13.1 PHP-Specific Concepts to Master

|Concept|Why It Matters|
|---|---|
|Loose vs strict comparison (`==` vs `===`)|PHP's type coercion causes `0 == "foo"` to be `true` — always use `===` in conditions|
|`declare(strict_types=1)`|Enables strict type checking for function arguments — eliminates silent type coercion bugs|
|Null coalescing (`??`)|Cleaner than `isset()` checks; chain with `??=` for assignment|
|`match` over `switch`|Strict comparison, no fall-through, returns a value — prefer `match` in PHP 8.0+|
|Reference variables (`&`)|PHP passes by value by default; use `&` to pass by reference in `foreach` and function args|
|Superglobal sanitisation|Never use `$_GET`/`$_POST` raw — always validate, filter, and escape|

---

### 13.2 Common Pitfalls

|Mistake|Problem|Fix|
|---|---|---|
|`==` with 0 and strings|`0 == "anything"` is `true` due to type coercion|Use `===` for all comparisons|
|`foreach` reference not unset|`&$value` after the loop still refers to last element|Always `unset($value)` after `foreach (&$value)`|
|Calling `echo` on arrays|`Array to string conversion` notice|Use `print_r()` or `implode()`|
|Missing `session_start()`|`$_SESSION` inaccessible — no error, just doesn't work|Call `session_start()` at top of every page using sessions|
|SQL injection via `$_POST`|Attacker manipulates queries|Use PDO with prepared statements always|
|XSS via `echo $_GET['input']`|Attacker injects JavaScript|Use `htmlspecialchars($input, ENT_QUOTES, 'UTF-8')` on all output|
|Suppressing errors with `@`|Hides bugs, makes debugging impossible|Fix the underlying issue; use proper error handling|
|Trusting `$_FILES['type']`|Easily spoofed by attacker|Use `finfo_file()` to check actual MIME type|

---

### 13.3 Quick Reference — Essential Snippets

```php
<?php
declare(strict_types=1);

// Safe output to browser
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');

// PDO prepared statement (SQL injection prevention)
$pdo = new PDO('mysql:host=localhost;dbname=mydb', $user, $pass);
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute([':id' => $id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Validate and filter input
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$age   = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT);

// File upload validation
$finfo    = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $_FILES['upload']['tmp_name']);
$allowed  = ['image/jpeg', 'image/png', 'image/gif'];
if (in_array($mimeType, $allowed, true)) {
    move_uploaded_file($_FILES['upload']['tmp_name'], '/safe/path/file.jpg');
}

// Session handling
session_start();
session_regenerate_id(true);    // Prevent session fixation
$_SESSION['user_id'] = $authenticatedUserId;

// Password hashing (never store plaintext)
$hash     = password_hash($password, PASSWORD_BCRYPT);
$isValid  = password_verify($inputPassword, $hash);

// JSON encode/decode
$json = json_encode($data, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
$data = json_decode($json, associative: true, flags: JSON_THROW_ON_ERROR);

// Null safe chaining
$city = $user?->getProfile()?->getAddress()?->getCity() ?? 'Unknown';

// Match expression
$status = match(true) {
    $score >= 90 => 'A',
    $score >= 80 => 'B',
    $score >= 70 => 'C',
    default      => 'F',
};
```

---

### 13.4 Key Standard Functions Quick Reference

```php
// --- MATH ---
abs(-5);          // 5
ceil(4.1);        // 5
floor(4.9);       // 4
round(4.5);       // 5
max(1, 2, 3);     // 3
min(1, 2, 3);     // 1
rand(1, 100);     // Random int between 1 and 100
pow(2, 10);       // 1024

// --- DATE / TIME ---
date('Y-m-d H:i:s');           // "2024-01-15 10:30:00"
time();                         // Current Unix timestamp
strtotime('next Monday');       // Unix timestamp for next Monday
date_create('2024-01-15');      // DateTime object

// --- FILE I/O ---
file_get_contents('file.txt');          // Read entire file into string
file_put_contents('file.txt', $data);  // Write string to file
file_exists('/path/to/file');           // Check if file exists
is_dir('/path/to/dir');                 // Check if path is a directory
mkdir('/new/dir', 0755, true);          // Create directory (recursive)
glob('/path/*.php');                    // Find files matching pattern

// --- TYPE CHECKING ---
is_int($v); is_float($v); is_string($v); is_bool($v);
is_null($v); is_array($v); is_object($v); is_callable($v);
empty($v);     // true if 0, '', null, false, [], "0"
isset($v);     // true if set AND not null
```
