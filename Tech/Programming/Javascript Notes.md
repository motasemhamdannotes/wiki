

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

#### Definition
JavaScript (JS) is one of the most widely used scripting languages in web development. While HTML provides the structure and CSS handles the styling, JavaScript is what brings a website to life. Once the basic elements are in place, JS can add interactivity , from form validation and button clicks to animations and dynamic content updates. That’s why learning JavaScript is just as essential as mastering HTML and CSS, since most JS code works hand in hand with HTML to create modern, interactive websites.

#### Variables
Variables act as containers for storing data values in JavaScript, similar to labeled buckets that hold information for future reference. Each variable has a unique name, allowing easy access to its stored value later. In JavaScript, there are three ways to declare variables:

- **`var`** (function-scoped)
- **`let`** (block-scoped)
- **`const`** (block-scoped, with immutable values)

Block-scoped variables (`let` and `const`) offer better control over visibility within specific sections of the code.

#### Data Types
Data types define the kind of value a variable can store. JavaScript includes:

- **String** (text)
- **Number** (numeric values)
- **Boolean** (true/false)
- **Null** (intentional absence of a value)
- **Undefined** (uninitialized variable)
- **Object** (complex structures like arrays and objects)

#### Functions
A function is a reusable block of code designed to perform a specific task. Instead of repeating code multiple times, functions allow developers to write modular and efficient code.

For example, in a web application displaying student results, we can create a function called `PrintResult(rollNum)`, which takes a roll number as an argument and prints the corresponding result:
```js
function PrintResult(rollNum) {
    alert("Username with roll number " + rollNum + " has passed the exam");
}
```
Calling this function multiple times reduces code repetition.

#### Loops
Loops allow the execution of a code block multiple times as long as a specified condition is met. JavaScript provides several looping constructs:

- **`for`** loop
- **`while`** loop
- **`do...while`** loop

For example, instead of manually calling the `PrintResult` function 100 times, we can use a loop:
```js
for (let i = 0; i < 100; i++) {
    PrintResult(rollNumbers[i]); // Executes 100 times
}
```
This approach ensures efficiency and reduces redundancy.

#### Request-Response Cycle
In web development, the **request-response cycle** refers to the interaction between a client (browser) and a server. When a user requests a webpage or data, the browser sends a request to the server, which processes it and returns the requested information, such as HTML content, JSON data, or other resources.

#### JS in HTML
JavaScript is an interpreted language, meaning it runs directly in the browser without requiring prior compilation. Below is an example of JavaScript code that highlights fundamental concepts such as variable declaration, data types, control flow statements, and basic functions. These core elements are essential for building interactive and dynamic web applications. If any of this seems unfamiliar now, don't worry—we will explore each concept in detail later.
```sql
// Hello, World! Program
console.log("Hello, World!");

// Variable and Data Type
let age = 25; // Number type

// Control Flow Statement
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// Function
function greet(name) {
    console.log("Hello, " + name + "!");
}

// Calling the function
greet("Bob");
```
Since JavaScript primarily executes on the client side, it allows easy interaction with and modification of HTML elements directly within the browser.

#### Internal JavaScript
Internal JavaScript refers to writing JS code directly within an HTML file. This approach is ideal for beginners as it allows them to observe how the script interacts with HTML elements. The code is enclosed within `<script>` tags, which can be placed inside the `<head>` section—typically for scripts that need to load before the page content—or inside the `<body>` section, where it can manipulate elements as they appear on the page.

Once the editor is open, insert the following code:
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Internal JavaScript</title>
</head>
<body>
    <h1>Adding Two Numbers</h1>
    <p id="result"></p>

    <script>
        let x = 5;
        let y = 10;
        let result = x + y;
        document.getElementById("result").innerHTML = "The result is: " + result;
    </script>
</body>
</html>
```
After pasting the code, go to the **File** menu, select **Save**, and save the file as `internal.html`. Then, double-click the file to open it in Chrome, where you will see the following output:
![[js-1.png]]
In this HTML document, we are using **internal JavaScript**, meaning the script is embedded directly within the HTML file using the `<script>` tag. The script executes a simple function: it adds two numbers (`x` and `y`) and displays the sum on the web page. JavaScript interacts with the HTML by selecting an element (`<p>` with `id="result"`) and updating its content using `document.getElementById("result").innerHTML`. This script runs automatically when the browser loads the HTML file.
#### External JavaScript
External JavaScript involves writing JS code in a separate file with a `.js` extension. This approach improves code organization and keeps the HTML file clean. The external script can be hosted on the same server as the HTML file or on an external platform such as a cloud server.

**Creating the JavaScript File:**  
Start by making a new file named **script.js** and save it on the Desktop. Add the following code:
```js
let x = 5;
let y = 10;
let result = x + y;
document.getElementById("result").innerHTML = "The result is: " + result;
```
**Creating the HTML File:**  
Next, create a new file called **external.html** and insert the following code. This HTML structure is identical to the previous example:
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>External JS</title>
</head>
<body>
    <h1>Addition of Two Numbers</h1>
    <p id="result"></p>

    <!-- Linking an external JavaScript file -->
    <script src="script.js"></script>
</body>
</html>
```
**Viewing the Results:**  
Open **external.html** by double-clicking it. You’ll notice that the output remains unchanged from the previous example.
![[js-2.png]]
The key difference here is that instead of embedding JavaScript directly in the HTML file, we linked an **external script** using the `<script>` tag with the `src` attribute. When the browser loads the page, it fetches the **script.js** file and executes its code within the HTML document. This method keeps JavaScript code separate, making it more **organized** and easier to manage, particularly for large projects.

![[js-3.png]]
**Checking for Internal vs. External JavaScript**
When performing security testing on a web application, identifying whether it uses **internal or external JavaScript** is essential. This can be determined by inspecting the page's source code.

To do this:

- Open the file **external_test.html** in Chrome.
- Right-click anywhere on the page and select **View Page Source**.

This will reveal the HTML code of the page.

- If JavaScript is embedded directly in the page, it will be inside `<script>` tags **without** a `src` attribute.
- If the `<script>` tag contains a `src` attribute, the JavaScript is being loaded from an external file.

#### Functions
A key purpose of JavaScript (JS) is to enable user interaction through dialogue boxes and dynamically update web content. JS includes built-in functions such as `alert`, `prompt`, and `confirm`, which help developers communicate with users, collect input, and request confirmation.
#### Alert
The `alert` function presents a message in a pop-up box with an "OK" button, primarily used to provide information or warnings. For instance, to display "Hello THM" to the user, you would use:
```js
alert("Hello THM");
```
To test this, open the Chrome console, type the above command, and press Enter. A pop-up will appear displaying the message.
![[js-4.png]]
#### Prompt
The `prompt` function opens a dialogue box that requests input from the user. It returns the inputted value if "OK" is clicked or `null` if "Cancel" is selected. For example, to prompt the user for their name, use:
```js
prompt("What is your name?");
```
To experiment with this, open the Chrome console and enter:
```js
name = prompt("What is your name?");
alert("Hello " + name);
```
After running the code, a dialogue box will appear asking for input, and the provided name will be displayed in an alert.
![[js-5.png]]
#### Confirm
The `confirm` function creates a dialogue box with a message and two options: "OK" and "Cancel." It returns `true` if the user selects "OK" and `false` if "Cancel" is clicked. For example, to request user confirmation, use:
```js
confirm("Are you sure?");
```
To try this, open the Chrome console, type:
```js
confirm("Do you want to proceed?");
```
![[js-6.png]]

#### Conditional Statements
Control flow in JavaScript determines the sequence in which statements and code blocks are executed based on specific conditions. JavaScript provides various control flow structures, including **if-else** and **switch** statements for decision-making, as well as loops like **for**, **while**, and **do...while** to execute repetitive tasks. Proper implementation of control flow allows a program to respond effectively to different conditions.

**Conditional Statements in Practice**
One of the most commonly used control flow structures is the **if-else statement**, which enables the execution of different code blocks depending on whether a condition evaluates to `true` or `false`.

To see this in action, let's create a file named **age.html** on the Desktop of the provided virtual machine (VM) and insert the following code:
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Age Verification</title>
</head>
<body>
    <h1>Age Verification</h1>
    <p id="message"></p>

    <script>
        age = prompt("What is your age?");
        if (age >= 18) {
            document.getElementById("message").innerHTML = "You are an adult.";
        } else {
            document.getElementById("message").innerHTML = "You are a minor.";
        }
    </script>
</body>
</html>
```
After saving the file, double-click it to open it in Google Chrome. You will see a prompt asking for your age. If you enter a value **18 or higher**, a message will appear stating, **"You are an adult."** Otherwise, it will display, **"You are a minor."**
![[js-7.png]]
This behavior is determined by the **if-else statement**, which evaluates the `age` variable and outputs the appropriate message based on the given condition.
#### Minification
**Minification** in JavaScript refers to the process of reducing file size by eliminating unnecessary characters, such as spaces, line breaks, and comments, as well as shortening variable names. This optimization helps improve web page loading times, especially in production environments. While minified files retain full functionality, they become more difficult for humans to read due to their compact structure.

Similarly, **obfuscation** is used to make JavaScript code harder to understand by renaming variables and functions to meaningless names, adding unnecessary code, and even inserting dummy elements.
#### Practical Example
1. **Creating an HTML File:**
    - On the Desktop of the provided virtual machine (VM), create a new file named **hello.html** and insert the following HTML code:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Obfuscated JS Code</title>
</head>
<body>
    <h1>Obfuscated JS Code</h1>
    <script src="hello.js"></script>
</body>
</html>
```

![[Notes Cataloge/IT & System Admin Notes/Programming/JS/js-8.png]]
**Creating a JavaScript File:**
- In the same location, create a file named **hello.js** and add the following script:
```js
function hi() {
    alert("Welcome to THM");
}
hi();
```
- **Executing the Script:**
    - Open **hello.html** in Google Chrome by double-clicking the file.
    - A pop-up alert will appear with the message **"Welcome to THM"**.
    - Click **OK** to close the alert box.
- **Inspecting the Code:**
    - Right-click on the webpage and select **Inspect** to open Developer Tools.
    - Navigate to the **Sources** tab and click on **hello.js** to view the script.
    - The JavaScript code remains fully visible and readable.
![[Notes Cataloge/IT & System Admin Notes/Programming/JS/js-9.png]]

#### Obfuscation 
To make the code less readable, we can use an online **minification and obfuscation** tool:

1. Open the tool’s website and paste the contents of **hello.js** into the provided input box.
2. Click the button to minify and obfuscate the script.
3. The tool will transform the original JavaScript into a complex, unreadable string of characters while maintaining its functionality.

Now, copy the obfuscated code and replace the original content of **hello.js** in the VM.  
```
(function(_0x114713,_0x2246f2){var _0x51a830=_0x33bf,_0x4ce60b=_0x114713();while(!![[_0x51a830(0x88))/(-0x1bd3+-0x9a+0x2*0xe37)*(parseInt(_0x51a830(0x94))/ (-0x15c1+-0x2*-0x3b3+0xe5d))+parseInt(_0x51a830(0x8d))/(0x961*0x1+0x2*0x4cb+0x4bd*-0x4)* (-parseInt(_0x51a830(0x97))/(-0x22b3+0x16e9+0x1*0xbce))+parseInt(_0x51a830(0x89))/ (-0x631+0x20cd+0x8dd*-0x3)*(-parseInt(_0x51a830(0x95))/(-0x8fc+0x161+0x7a1))+- parseInt(_0x51a830(0x93))/(-0x1c38+0x193+0x1aac)*(parseInt(_0x51a830(0x8e))/ (-0x1*-0x17a6+-0x167e+-0x3*0x60))+-parseInt(_0x51a830(0x91))/(-0x2*-0x1362+-0x4a8*0x5+-0xf73)* (parseInt(_0x51a830(0x8b))/(-0xb31*0x2+0x493*0x5+0x1*-0x73))+parseInt(_0x51a830(0x8f))/ (-0x257a+-0x1752+0x3cd7)+parseInt(_0x51a830(0x90))/(-0x2244+-0x15f9+0x3849);if(_0x51ecd3 ===_0x2246f2)break;else _0x4ce60b['push'](_0x4ce60b['shift'](]]);}catch(_0x38d15c) {_0x4ce60b[[_0x4ce60b['shift'](|'push']]);}}}(_0x11ed,-0x17d11*-0x1+0x2*0x2e27+0x100f*0x17)); function hi(){var _0x48257e=_0x33bf,_0xab1127={'xMVHQ':function(_0x4eefa0,_0x4e5f74) {return _0x4eefa0(_0x4e5f74);},'FvtWc':_0x48257e(0x96)+_0x48257e(0x92)};_0xab1127[[0x8c) ](alert,_0xab1127[_0x48257e(0x8a|_0x48257e(0x8c) ]]]);}function _0x33bf(_0xb07259,_0x5949fe){var _0x3a386b =_0x11ed();return _0x33bf=function(_0x4348ee,_0x1bbf73){_0x4348ee=_0x4348ee-(0x11f7+- 0x1*0x680+-0x3a5*0x3);var _0x423ccd=_0x3a386b[_0x4348ee];return _0x423ccd;},_0x33bf (_0xb07259,_0x5949fe);}function _0x11ed(){var _0x4c8fa8=['7407EbJESQ','\x20THM', '2700698TTmqXC','10ILFtfZ','190500QONgph','Welcome\x20to', '4492QOmepo','21623eEAyaP','65XMlsxw','FvtWc','2410qfnGAy','xMVHQ','321PfYXZg', '8XBaIAe','1946483GviJfa','15167592PYYhTN'];_0x11ed=function(){return _0x4c8fa8;};return _0x11ed();}hi();
```

![[js-10.png]]

Reload **hello.html** in Google Chrome, inspect the script again under the **Sources** tab, and observe that while the code is now obfuscated, it still functions identically.

![[js-11.png]]

#### Deobfuscating the Code
If needed, the obfuscated script can be **deobfuscated** using an online tool:

1. Visit the deobfuscation tool’s website.
2. Paste the obfuscated script into the provided input box.
3. The tool will analyze and reconstruct a **human-readable** version of the original JavaScript.

This process allows developers to better understand and analyze scripts that have been deliberately obfuscated.



