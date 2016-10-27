export function privateEnv() {
  const weakMap = new WeakMap();

  return key => weakMap.get(key) || (weakMap.set(key, {}) && weakMap.get(key));
}
