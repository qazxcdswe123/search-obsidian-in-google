export function getPossibleElementByQuerySelector<T extends Element>(
  queryArray: string[]
): T | undefined {
  for (const query of queryArray) {
    const element = document.querySelector(query);
    if (element) {
      return element as T;
    }
  }
}

export function isBraveBrowser() {
  return (navigator as any).brave?.isBrave();
}
