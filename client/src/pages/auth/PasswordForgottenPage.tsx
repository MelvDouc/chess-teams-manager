import Form from "@src/components/Form/Form.jsx";
import FormOnlyPage from "@src/components/FormOnlyPage/FormOnlyPage.jsx";
import Modal from "@src/components/Modal/Modal.jsx";
import { post } from "@src/utils/api.js";

export default function PasswordForgottenPage() {
  let ffeId: string;

  return (
    <FormOnlyPage>
      <Form
        onsubmit={async (e) => {
          e.preventDefault();
          const response = await post("/auth/password-forgotten", {
            ffeId,
            baseUrl: `${location.origin}/nouveau-mot-de-passe/`
          });

          if (!response)
            return alert("Une erreur s'est produite. Veuillez réessayer ultérieurement.");

          Modal.setState({
            type: "warning",
            message: "La demande a bien été prise en compte. Si un joueur avec n° FFE existe bien, un lien de réinitialisation du mot de passe lui sera envoyé par email."
          });
        }}
      >
        <section className="row">
          <article className="col-12">
            <h2>Demande de réinitialisation</h2>
          </article>
        </section>
        <section className="row">
          <article className="col-12">
            <Form.Group
              type="text"
              nameAndId="ffe-id"
              labelText="N° FFE"
              pattern="[A-Z]\d+"
              placeholder="Majuscule suivie de plusieurs chiffres"
              handleInput={(inputValue: string) => ffeId = inputValue}
              required
            />
          </article>
        </section>
        <Form.Submit text="Valider" />
      </Form>
    </FormOnlyPage>
  );
}