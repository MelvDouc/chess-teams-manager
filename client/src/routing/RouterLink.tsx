import Router from "@src/routing/Router.js";

export default function RouterLink({ href, className, title, children }: {
  href: string;
  className?: string;
  title?: string;
  children?: FreeJSX.ComponentChildren;
}) {
  return (
    <a
      href={href}
      $init={(element) => {
        className && (element.className = className);
        title && (element.title = title);
        element.addEventListener("click", (e) => {
          e.preventDefault();
          Router.navigate(href);
        });
      }}
    >{children}</a>
  );
}