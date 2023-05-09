import Form from "@src/components/Form/Form.jsx";
import FormOnlyPage from "@src/components/FormOnlyPage/FormOnlyPage.jsx";
import Modal from "@src/components/Modal/Modal.jsx";
import router from "@src/router.jsx";
import { post } from "@src/utils/api.js";

export default function PasswordResetPage({ pwdResetId }: {
  pwdResetId: string;
}) {
  const passwords = {
    pwd1: "",
    pwd2: ""
  };

  return (
    <FormOnlyPage>
      <Form
        onsubmit={async (e) => {
          e.preventDefault();
          const response = await post(`/auth/password-reset/${pwdResetId}`, passwords);

          if (!response?.success)
            return alert((response?.errors) ? response.errors.join("\n") : "Une erreur s'est produite.");

          Modal.setState({
            type: "success",
            message: "Votre mot de passe a bien été mis à jour.",
            onClose: () => router.navigate("/connexion")
          });
        }}
      >
        <section className="row">
          <article className="col-12">
            <h2>Nouveau mot de passe</h2>
          </article>
        </section>
        <section className="row">
          <article className="col-12">
            <Form.Group
              type="password"
              nameAndId="pwd-1"
              labelText="Nouveau mot de passe"
              handleInput={(pwd) => passwords.pwd1 = pwd}
              required
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12">
            <Form.Group
              type="password"
              nameAndId="pwd-2"
              labelText="Confirmer"
              handleInput={(pwd) => passwords.pwd2 = pwd}
              required
            />
          </article>
        </section>
        <Form.Submit text="Valider" />
      </Form>
    </FormOnlyPage>
  );
}