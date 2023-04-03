export default function createElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  attributes: Record<string, any>,
  ...children: (Node | string)[]
): HTMLElementTagNameMap[T] {
  const element = document.createElement(tagName);
  Object.assign(element, attributes);
  element.append(...children);
  return element;
}