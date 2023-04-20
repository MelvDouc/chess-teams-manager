import Router from "@routing/Router.js";

export default function RouterOutlet() {
  return (
    <div
      className="container"
      $init={(element) => {
        Router.onUrlChange(async ({ component }) => {
          element.replaceChildren(await component());
        });
      }}
    ></div>
  );
}