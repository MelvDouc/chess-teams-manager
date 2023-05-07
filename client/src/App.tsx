import Header from "@src/components/Header/Header.jsx";
import Main from "@src/components/Main/Main.jsx";
import Modal from "@src/components/Modal/Modal.jsx";
import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";

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
