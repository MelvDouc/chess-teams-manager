export default function createAccessors<TTarget extends {}, TKey extends keyof TTarget>(target: TTarget, propName: TKey): PropertyAccessors<TTarget, TKey> {
  return {
    get: (): TTarget[TKey] => target[propName],
    set: (value: TTarget[TKey]): void => {
      target[propName] = value;
    }
  };
}

export type PropertyAccessors<TTarget extends {}, TKey extends keyof TTarget> = {
  get: () => TTarget[TKey];
  set: (value: TTarget[TKey]) => void;
};