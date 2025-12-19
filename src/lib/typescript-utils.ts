export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

/**
 * Update specific properties of a type with new types
 */
export type UpdateProps<T, K extends keyof T, U> = Omit<T, K> & { [P in K]: U };

/**
 * Create a type with specific properties constrained to certain values
 */
export type ConstrainProps<T, K extends keyof T, U> = {
  [P in keyof T]: P extends K ? U : T[P];
};

/**
 * Make specific properties required while keeping others optional
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;
