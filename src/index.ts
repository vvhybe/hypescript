export * from './negated';
export * from './nominal';
export * from './property';
export * from './recursive';


/**
 * Ensures that the specified keys in a type are non-nullable and non-undefined.
 * 
 * @template T - The original type to be modified.
 * @template K - The keys in the type T that should be asserted as non-nullable.
 * 
 * @example
 * interface User {
 *   name?: string;
 *   email?: string;
 *   age: number | null;
 * }
 * 
 * // Ensures 'name' and 'email' are non-nullable
 * type StrictUser = Assert<User, 'name' | 'email'>;
 * // Resulting type: 
 * // {
 * //   name: string;
 * //   email: string;
 * //   age: number | null;
 * // }
 */
export type Assert<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: Exclude<T[P], null | undefined>;
};

/**
 * A utility type that represents a value that can either be of type `T` or `null`.
 * 
 * @template T - The base type to be made nullable.
 * 
 * @example
 * type OptionalString = Nullable<string>;
 * // Can be: string | null
 * 
 * @example
 * interface User {
 *   name: string;
 *   avatar?: Nullable<string>;
 * }
 */
export type Nullable<T> = T | null;

/**
 * Removes `null` and `undefined` from a given type.
 * 
 * @template T - The type to be made non-nullable.
 * 
 * @example
 * type MaybeString = string | null | undefined;
 * type Str = NonNullable<MaybeString>; 
 * // Results in: string
 * 
 * @example
 * type ComplexType = { a: number | null, b: string | undefined };
 * type Cleaned = NonNullable<ComplexType>;
 * // Results in: { a: number, b: string }
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Makes specified keys of a given type nullable while keeping other keys unchanged.
 * 
 * @template T - The original type to be modified.
 * @template K - The keys of T that should be made nullable. Defaults to all keys of T.
 * 
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 *   image: string;
 * }
 * 
 * // Makes only 'image' nullable
 * type UserWithNullableImage = DeepNullable<User, 'image'>;
 * // Resulting type:
 * // {
 * //   id: number;
 * //   name: string;
 * //   image: string | null;
 * // }
 */
export type NullableKeys<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null;
};

/**
 * A strict version of `Omit` that ensures the keys being omitted exist in the original type.
 * 
 * @template T - The original type.
 * @template K - The keys to be omitted from the type.
 * 
 * @example
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * type UserWithoutEmail = StrictOmit<User, 'email'>;
 * // Resulting type: { id: number; name: string; }
 */
export type StrictOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
};


/**
 * Creates a type with exactly the specified keys, ensuring type exactness.
 * 
 * @template T - The base type.
 * @template U - The type to be constrained, must be a subset of T.
 * 
 * @example
 * interface FullUser {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * 
 * // Ensures only specified keys are used
 * type LimitedUser = Exact<FullUser, { id: number; name: string }>;
 */
export type Exact<T, U extends T> = U;

/**
 * Converts a union type to an intersection type.
 * 
 * @template U - The union type to be converted.
 * 
 * @example
 * type NumberOrString = number | string;
 * type Intersection = UnionToIntersection<NumberOrString>;
 * // Results in a type that cannot be instantiated directly
 * 
 * @remarks
 * This is a advanced type-level utility often used in complex type manipulations.
 */
export type UnionToIntersection<U> = 
  (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;



/**
 * A conditional type that evaluates to `Then` if `Condition` is `true`, otherwise it evaluates to `Else`.
 *
 * @template Condition - A boolean type that determines which type to select.
 * @template Then - The type to select if `Condition` is `true`.
 * @template Else - The type to select if `Condition` is `false`.
 * @example
 * type Result = If<true, 'yes', 'no'>;
 * // Result: 'yes'
 */
export type If<Condition extends boolean, Then, Else> = Condition extends true ? Then : Else;
