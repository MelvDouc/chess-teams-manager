export interface Route {
  preCheck: () => Promise<boolean>;
  getParams?: (pathname: string) => Record<string, any>;
  getTitle: (arg?: { params?: Record<string, any>; }) => string;
  component: (arg?: { params?: Record<string, any>; }) => string | Node | Promise<string | Node>;
}