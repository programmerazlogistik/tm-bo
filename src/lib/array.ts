function removeByIndex<T>(array: T[], ...indexes: number[]): T[] {
  const removeSet = new Set(indexes);
  return array.filter((_, i) => !removeSet.has(i));
}

export const util = {
  array: { removeByIndex },
};
