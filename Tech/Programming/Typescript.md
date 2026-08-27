

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

# TypeScript : Core Definition and Purpose
TypeScript is a **statically typed superset of JavaScript** designed to enhance reliability, maintainability, and developer productivity without abandoning JavaScript compatibility. The defining characteristic of TypeScript is that it introduces **optional static typing**, allowing developers to define explicit types for variables, functions, and objects. These types are evaluated during compilation rather than execution, enabling early detection of logical errors before runtime.

Unlike traditional compiled languages, TypeScript does not run directly in execution environments such as browsers or Node.js. Instead, it must be **compiled into standard JavaScript**, which is then executed normally. This compilation step transforms typed TypeScript code into compatible JavaScript while preserving functionality.

TypeScript files use specific extensions depending on context:

- `.ts` : Standard TypeScript files
- `.tsx` : TypeScript files used with React JSX syntax

Despite extending JavaScript syntax, TypeScript remains fully compatible with existing JavaScript workflows. Developers can progressively introduce typing features into existing JavaScript projects rather than rewriting entire codebases.

---

# Compilation and Execution Workflow

TypeScript execution follows a defined lifecycle that includes compilation followed by runtime execution.

Basic compilation and execution:
```typescript
tsc filename.ts  
node filename.js
```

Direct execution without manual compilation:
```typescript
ts-node filename.ts
```
Standard development setup includes installing TypeScript globally and creating program files before compilation.
```typescript
npm install -g typescript  
touch program.ts  
tsc program.ts  
node program.js
```
This workflow reinforces the fundamental rule that **TypeScript must always be converted into JavaScript before execution**, unless intermediary tools such as `ts-node` handle compilation automatically.

---

# Basic Data Types

TypeScript introduces structured typing that supports both primitive and advanced data categories. These types control how data is validated during compilation and ensure consistency throughout application logic.

Core primitive and special types include:

- **number** : Used for both integers and floating-point values
- **string** : Used for text values
- **boolean** : Represents true or false conditions
- **undefined** : Indicates absence of assigned value
- **null** : Represents intentional absence of value
- **any** : Disables type checking completely
- **unknown** : Similar to `any`, but requires validation before use
- **void** : Represents absence of return value
- **never** : Indicates values that never occur
- **object** : Represents structured non-primitive values

Examples:
```typescript
let age: number = 42;  
let username: string = "admin";  
let isActive: boolean = true;  
let data: unknown = "needs validation";
```

The difference between `any` and `unknown` represents an important safety distinction. While `any` bypasses validation entirely, `unknown` forces validation before use, reducing runtime risks.
