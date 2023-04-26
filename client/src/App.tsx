import Header from "@src/components/Header/Header.jsx";
import Router from "@src/routing/Router.js";
import RouterOutlet from "@src/routing/RouterOutlet.jsx";

export default function App() {
  window.onpopstate = () => Router.updateUrl(location.pathname);
  Router.onUrlChange(({ title }) => {
    document.title = `${title} | Thionville Échecs — Équipes`;
  });

  return {
    mount: (parent: Node) => {
      parent.appendChild(
        <>
          <Header />
          <main className="p-4 overflow-y-auto">
            <RouterOutlet />
          </main>
        </>
      );
      Router.updateUrl(location.pathname);
    }
  };
}