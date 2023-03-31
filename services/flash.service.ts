const handler: {
  success: string | null;
  info: string | null;
  errors: string[] | null;
  temp: any;
} = {
  success: null,
  info: null,
  errors: null,
  temp: null,
};

const flashService = new Proxy(handler, {
  get(target, key) {
    const value = target[key as keyof typeof target];
    target[key as keyof typeof target] = null;
    return value;
  }
});

export default flashService;