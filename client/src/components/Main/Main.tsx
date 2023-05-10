import cssClasses from "./Main.module.scss";

export default function Main({ onUrlChange }: {
  onUrlChange(subscription: (routeInfo: { component: () => Node | string | Promise<Node | string>; }) => any): void;
}) {
  return (
    <main className={cssClasses.main}>
      <div
        className="container-sm h-100 p-4"
        $init={(element) => {
          onUrlChange(async ({ component }) => {
            element.replaceChildren(await component());
          });
        }}
      ></div>
    </main>
  );
}