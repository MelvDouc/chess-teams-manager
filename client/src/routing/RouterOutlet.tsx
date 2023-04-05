import Router from "@routing/Router.js";

export default function RouterOutlet() {
  return (
    <div
      className="router-outlet"
      $init={(element) => {
        Router.onUrlChange(async ({ component, params }) => {
          element.replaceChildren(await component(params));
        });
      }}
    ></div>
  );
}