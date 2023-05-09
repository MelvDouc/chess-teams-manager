import Header from "@src/components/Header/Header.jsx";
import Main from "@src/components/Main/Main.jsx";
import Footer from "@src/components/Footer/Footer.jsx";
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
          <Footer />
          {Modal.getModal()}
        </>
      );
      auth.logBack().then(() => {
        router.updateUrl(location.pathname);
      });
    },
  };
}
