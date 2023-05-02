import Header from "@src/components/Header/Header.jsx";
import Modal from "@src/components/Modal/Modal.jsx";
import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";

export default function App() {
  return {
    mount: (parent: Node) => {
      parent.appendChild(
        <>
          <Header />
          <main className="p-4 overflow-y-auto">
            <div
              className="container-sm"
              $init={(element) => {
                router.onUrlChange(async ({ component }) => {
                  element.replaceChildren(await component());
                });
              }}
            ></div>
            {Modal.getModal()}
          </main>
        </>
      );
      auth.logBack().then(() => router.updateUrl(location.pathname));
    }
  };
}