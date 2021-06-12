export function reduceToObject<T extends any[]>(array: T, values: (curt: string) => any): Record<keyof T, any> {
  return array.reduce(
    (prev, curt) => ({
      ...prev,
      ...values(curt)
    }),
    {}
  );
}
