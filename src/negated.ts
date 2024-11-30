// src/negated.ts

/**
 * Exclude specific properties from a type.
 */
export type ExcludeKeys<T, K extends keyof T> = Omit<T, K>;

/**
 * Exclude specific types from a union.
 */
export type ExcludeType<T, U> = T extends U ? never : T;

/**
 * Example: Exclude a subset from a union
 */
export type NonStringOrNumber = ExcludeType<unknown, string | number>;
