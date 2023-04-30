import Router from "@src/routing/Router.js";

export default function RouterLink({ href, className, children }: {
  href: string;
  className?: string;
  children?: FreeJSX.ComponentChildren;
}) {
  return (
    <a
      href={href}
      $init={(element) => {
        className && (element.className = className);
        element.addEventListener("click", (e) => {
          e.preventDefault();
          Router.navigate(href);
        });
      }}
    >{children}</a>
  );
}