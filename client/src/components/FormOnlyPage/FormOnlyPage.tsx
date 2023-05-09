import { ComponentChildren } from "reactfree-jsx";

export default function FormOnlyPage({ children }: { children?: ComponentChildren; }) {
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      {children}
    </div>
  );
}