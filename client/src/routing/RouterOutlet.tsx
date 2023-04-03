import Router from "@routing/Router.js";

export default function RouterOutlet() {
  return (
    <div
      className="router-outlet"
      $init={(element) => {
        Router.onUrlChange(async ({ component, getParams }) => {
          const params = getParams ? getParams(location.pathname + location.search) : undefined;
          element.replaceChildren(await component(params));
        });
      }}
    ></div>
  );
}