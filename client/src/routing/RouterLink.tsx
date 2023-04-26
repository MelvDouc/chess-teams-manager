import Router from "@src/routing/Router.js";

export default function RouterLink({ href, className, children }: {
  href: string;
  className?: string;
  children?: ComponentChildren;
}) {
  return (
    <a
      href={href}
      $init={(element) => {
        className && (element.className = className);
        element.addEventListener("click", (e) => {
          e.preventDefault();
          window.history.pushState({}, "", href);
          Router.updateUrl(href);
        });
      }}
    >{children}</a>
  );
}