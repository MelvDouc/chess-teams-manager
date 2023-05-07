import Header from "@src/components/Header/Header.jsx";
import Footer from "@src/components/Footer/Footer.jsx";
import Modal from "@src/components/Modal/Modal.jsx";
import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return {
    mount: (parent: Node) => {
      parent.appendChild(
        <>
          <Header />
          <main className="overflow-y-auto">
            <div
              className="container-sm min-vh-100 p-4"
              $init={(element) => {
                router.onUrlChange(async ({ component }) => {
                  element.replaceChildren(await component());
                });
              }}
            ></div>
            <Footer />
          </main>
          {Modal.getModal()}
        </>
      );
      auth.logBack().then((connected) => {
        router.updateUrl(connected ? location.pathname : "/connexion");
      });
    },
  };
}
