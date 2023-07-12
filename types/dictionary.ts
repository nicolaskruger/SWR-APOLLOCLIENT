export type MyDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};
