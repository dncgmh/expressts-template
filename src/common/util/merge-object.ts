/**
 *
 *  @description isValid properties of ...source and merge them to target object
 * @param {Object} target
 * @param {Object} source
 * @returns merged object
 */
export const mergeObject = <T = Record<string, any>>(...source: Record<string, any>[]): T => {
  const data = {};
  Object.assign(data, ...source);
  for (const iterator in data) {
    if (typeof data[iterator] !== 'boolean' && typeof data[iterator] !== 'number' && !data[iterator])
      delete data[iterator];
  }

  return data as T;
};
