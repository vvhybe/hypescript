
/**
 * Recursively makes all properties of a type optional.
 * 
 * @template T - The type to be made deeply partial.
 * 
 * @example
 * interface Complex {
 *   user: {
 *     name: string;
 *     address: {
 *       street: string;
 *       city: string;
 *     }
 *   };
 *   settings: {
 *     theme: string;
 *   }
 * }
 * 
 * type PartialComplex = DeepPartial<Complex>;
 * // Resulting type makes all nested properties optional
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object 
    ? DeepPartial<T[P]> 
    : T[P]
};


/**
 * Recursively makes all properties of a type readonly.
 * 
 * @template T - The type to be made deeply readonly.
 * 
 * @example
 * interface MutableUser {
 *   name: string;
 *   address: {
 *     street: string;
 *     city: string;
 *   }
 * }
 * 
 * type ImmutableUser = DeepReadonly<MutableUser>;
 * // All properties, including nested ones, become readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P]
};


/**
 * Recursively flattens a nested object type.
 *
 * This utility type takes a nested object type `T` and recursively flattens it,
 * such that all nested properties are brought to the top level.
 *
 * @template T - The type of the object to be flattened.
 *
 * @example
 * type Nested = {
 *   a: {
 *     b: {
 *       c: number;
 *     };
 *   };
 *   d: string;
 * };
 *
 * type Flattened = Flatten<Nested>;
 * // Flattened is equivalent to:
 * // {
 * //   a: {
 * //     b: {
 * //       c: number;
 * //     };
 * //   };
 * //   d: string;
 * // }
 */
export type Flatten<T> = {
  [K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K];
};
