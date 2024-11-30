/**
 * Picks properties from a type that match a specific type.
 * 
 * @template T - The source type.
 * @template U - The type to match against.
 * 
 * @example
 * interface Mixed {
 *   id: number;
 *   name: string;
 *   tags: string[];
 *   createdAt: Date;
 * }
 * 
 * type StringProps = PickByType<Mixed, string>;
 * // Results in: { name: string }
 */
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};


/**
 * Excludes properties from a type that match a specific type.
 * 
 * @template T - The source type.
 * @template U - The type to exclude.
 * 
 * @example
 * interface Mixed {
 *   id: number;
 *   name: string;
 *   tags: string[];
 *   createdAt: Date;
 * }
 * 
 * type NonStringProps = ExcludeByType<Mixed, string>;
 * // Results in: { id: number, tags: string[], createdAt: Date }
 */
export type ExcludeByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
};


/**
 * Merges two types, with the second type taking precedence.
 * 
 * @template F - The first (base) type.
 * @template S - The second (overriding) type.
 * 
 * @example
 * type Base = { a: number; b: string };
 * type Override = { b: number; c: boolean };
 * 
 * type Merged = Merge<Base, Override>;
 * // Results in: { a: number; b: number; c: boolean }
 */
export type Merge<F, S> = {
  [K in keyof F]: K extends keyof S ? S[K] : F[K]
} & S;
