// src/nominal.ts

/**
 * Creates a nominal type by adding a unique tag.
 */
export type Nominal<Type, Tag extends string> = Type & { readonly __tag: Tag };
