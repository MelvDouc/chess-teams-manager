import Header from "@src/components/Header/Header.jsx";
import Router from "@src/routing/Router.js";
import RouterOutlet from "@src/routing/RouterOutlet.jsx";
import auth from "@src/utils/auth.js";

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
      auth.logBack().then(() => Router.updateUrl(location.pathname));
    }
  };
}