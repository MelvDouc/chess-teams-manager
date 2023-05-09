import { ComponentChildren } from "reactfree-jsx";

export default function Dropdown({ mainText, children, $init }: {
  mainText: string;
  $init?: (element: HTMLElement) => void;
  children?: ComponentChildren;
}) {
  return (
    <li className="nav-item dropdown" $init={$init}>
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {mainText}
      </a>
      <ul className="dropdown-menu">
        {children}
      </ul>
    </li>
  );
}
