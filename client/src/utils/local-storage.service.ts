import { Observable } from "reactfree-jsx";

class LocalStorageDataManager<T> {
  private readonly key: string;
  private readonly map: (value: string | null) => T;
  private readonly stringify: (value: T) => string;
  private readonly dataObs: Observable<T | null>;

  constructor(key: string, map: (value: string | null) => T, stringify: (value: T | null) => string) {
    this.key = key;
    this.map = map;
    this.stringify = stringify;
    this.dataObs = new Observable(this.getData());
  }

  getData(): T {
    return this.map(localStorage.getItem(this.key));
  }

  setData(data: T): this {
    localStorage.setItem(this.key, this.stringify(data));
    this.dataObs.value = data;
    return this;
  }

  unsetData(): this {
    localStorage.removeItem(this.key);
    this.dataObs.value = null;
    return this;
  }

  onChange(subscription: (data: T | null) => void) {
    this.dataObs.subscribe(subscription);
  }
}

export const authTokenLocalStorageDataManager = new LocalStorageDataManager<string | null>(
  "auth_token",
  (value) => value,
  (value) => value ?? ""
);
