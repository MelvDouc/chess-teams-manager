import Form from "@src/components/Form/Form.jsx";
import { post } from "@src/utils/api.js";

export default function PasswordResetPage({ pwdResetId }: {
  pwdResetId: string;
}) {
  const messageElement: HTMLParagraphElement = (<p></p>);
  const passwords = {
    password1: "",
    password2: ""
  };

  return (
    <>
      <section className="mb-3">
        <h2>Réinitialisation de de mot de passe</h2>
        <Form
          handleSubmit={async (e) => {
            e.preventDefault();
            const postResult = await post<typeof passwords, { success?: boolean; errors?: string[]; }>(`/auth/password-reset/${pwdResetId}`, passwords);

            if (postResult?.errors)
              return alert(postResult.errors.join("\n"));

            messageElement.innerText = "Votre mot de passe a bien été mis à jour";
            setTimeout(() => location.assign("/auth/connexion"), 3000);
          }}
        >
          <Form.Group
            type="password"
            nameAndId="password1"
            updateValue={(p) => passwords.password1 = p}
            labelText="Nouveau mot de passe"
            required
          />
          <Form.Group
            type="password"
            nameAndId="password2"
            updateValue={(p) => passwords.password2 = p}
            labelText="Confirmer"
            required
          />
          <Form.Submit text="Valider" />
        </Form>
      </section>
      {messageElement}
    </>
  );
}