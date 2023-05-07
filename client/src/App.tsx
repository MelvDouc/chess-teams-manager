import Header from "@src/components/Header/Header.jsx";
import Main from "@src/components/Main/Main.jsx";
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
          <Main onUrlChange={router.onUrlChange.bind(router)} />
          {Modal.getModal()}
        </>
      );
      auth.logBack().then((connected) => {
        router.updateUrl(connected ? location.pathname : "/connexion");
      });
    },
  };
}
