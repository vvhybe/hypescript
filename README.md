
![toothscript-shaped](https://github.com/user-attachments/assets/3d390e2d-cde6-4b4c-9319-3568e9c98a07)

# 🦷 ToothScript

Welcome to the 🦷 **ToothScript** Types package! This package provides a curated collection of modular and reusable utility types designed to enhance your TypeScript experience without cluttering the global type namespace. Each utility type is crafted with flexibility and modularity in mind, avoiding conflicts with existing TypeScript behavior while offering precise, documented solutions for real-world use cases.

## 📜 Table of Contents

- [🦷 ToothScript](#-toothscript)
  - [📜 Table of Contents](#-table-of-contents)
  - [🌟 Introduction](#-introduction)
  - [📦 Installation](#-installation)
  - [🛠️ Utility Types Overview](#️-utility-types-overview)
    - [Key Type Modifications](#key-type-modifications)
      - [Assert](#assert)
    - [StrictOmit](#strictomit)
    - [NullableKeys](#nullablekeys)
    - [Type Composition and Transformation](#type-composition-and-transformation)
      - [DeepPartial](#deeppartial)
    - [Negate \& Nominal](#negate--nominal)
      - [Negate](#negate)
      - [Nominal](#nominal)
  - [🤔 Why Not Global Utility Types?](#-why-not-global-utility-types)
  - [🛡️ Contributing](#️-contributing)
  - [📄 License](#-license)
  - [💬 Feedback](#-feedback)
  
## 🌟 Introduction

This package was inspired by the need for better flexibility and extensibility when working with utility types. While TypeScript offers some built-in types like Omit and Pick, its team has decided not to add new utility types globally, citing potential conflicts and varying user preferences.

Instead, this package embraces user-defined utility types to:

- Avoid conflicts with TypeScript’s standard library.
- Provide strict, customizable, and modular definitions.
- Adapt to project-specific needs with ease.

## 📦 Installation

You can install the package via `npm` or `pnpm`:

```bash
npm install toothscript
```

```bash
pnpm install toothscript
```

## 🛠️ Utility Types Overview

### Key Type Modifications

#### Assert

Ensures specified keys in a type are non-nullable and non-undefined.
Useful for strict type validations.

```typescript
type Assert<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: Exclude<T[P], null | undefined>;
};
```

- Example:

```typescript
interface User {
  name?: string;
  email?: string;
  age: number | null;
}

type StrictUser = Assert<User, 'name' | 'email'>;
// { name: string; email: string; age: number | null; }
```

---

### StrictOmit

Ensures omitted keys exist in the original type.

```typescript
type StrictOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

- Example:

```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

type UserWithoutAge = StrictOmit<User, 'xage'>;  // Error: 'xage' does not exist in User
```

---

### NullableKeys

Allows a subset of keys in a type to be `nullable`.

```typescript
type NullableKeys<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null;
};
```

- Example:

```typescript
type User = {
  name: string;
  email: string;
  image: string;
  age: number;
};

type PartialUser = NullableKeys<User, 'image' | 'age'>;
// { name: string; email: string; image: string | null; age: number | null; }
```

---

### Type Composition and Transformation

This section includes utility types that help compose and transform types.

#### DeepPartial

Recursively makes all properties of a type optional.

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

- Example:

```typescript
interface Complex {
  user: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
}

type PartialComplex = DeepPartial<Complex>;
// { user?: { name?: string; address?: { street?: string; city?: string; }; }; }
```

---

### Negate & Nominal

Negates a type or creates a nominal type.

#### Negate

Negates a type. excluding the specified type. either by type or by key.

```typescript
export type ExcludeKeys<T, K extends keyof T> = Omit<T, K>;
export type ExcludeType<T, U> = T extends U ? never : T;


```

- Example:

```typescript
type User = {
  name: string;
  email: string;
  age: number;
};

type UserWithoutAge = ExcludeKeys<User, 'age'>;
// { name: string; email: string; }

type UserWithoutString = ExcludeType<User, string>;
// { age: number; }
```

---

#### Nominal

Creates a nominal type by adding a unique tag to the type. to avoid type compatibility.
useful for creating unique types. as a signature type.

```typescript
export type Nominal<Type, Tag extends string> = Type & { readonly __tag: Tag };
```

- Example:

```typescript
type UserId = Nominal<number, 'UserId'>;
type PostId = Nominal<number, 'PostId'>;

const userId: UserId = 1;
const postId: PostId = 1;

if (userId === postId) {
  // Error: Type 'PostId' is not assignable to type 'UserId'
}
```

## 🤔 Why Not Global Utility Types?

The TypeScript team has adopted a [**No New Utility Types**](https://github.com/microsoft/TypeScript/wiki/No-New-Utility-Types) policy for the standard library. The reasons include:

- Conflicts in Naming: New types often overlap with existing or user-defined types, causing confusion or compatibility issues.
- Semantics Disputes: Definitions for types like `Nullable<T>` can vary significantly between users.
- Breaking Changes: Changing or removing a globally available type can cause significant disruptions in existing projects.

This package avoids these issues by:

- Offering modular utility types that live only in your project’s namespace.
- Allowing you to tailor types for your specific needs without relying on TypeScript’s global library.

Key Principles:

- No global pollution.
- User-focused modularity.
- Flexibility for both strict and loose typing requirements.

## 🛡️ Contributing

We welcome contributions! Whether you find a bug, have a feature request, or want to add new types, feel free to contribute.

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a detailed explanation.

## 📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute this package as long as the license terms are respected.

## 💬 Feedback

If you have any suggestions or feedback, feel free to open an issue or contact us directly.

---

By using this package, you retain full control over type design while adhering to TypeScript’s recommended practices. 🎉
