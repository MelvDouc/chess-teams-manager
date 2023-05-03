import Form from "@src/components/Form/Form.jsx";
import Modal from "@src/components/Modal/Modal.jsx";
import router from "@src/router.jsx";
import { post } from "@src/utils/api.js";

export default function PasswordResetPage({ pwdResetId }: {
  pwdResetId: string;
}) {
  const passwords = {
    password1: "",
    password2: ""
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <Form
        handleSubmit={async (e) => {
          e.preventDefault();
          const postResult = await post<typeof passwords, { success?: boolean; errors?: string[]; }>(`/auth/password-reset/${pwdResetId}`, passwords);

          if (postResult?.errors)
            return alert(postResult.errors.join("\n"));

          Modal.setState({
            type: "success",
            message: "Votre mot de passe a bien été mis à jour.",
            onClose: () => router.navigate("/connexion")
          });
        }}
      >
        <Form.Row>
          <h2 className="text-center">Réinitialisation de de mot de passe</h2>
        </Form.Row>
        <Form.Row>
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
        </Form.Row>
        <Form.Row>
          <Form.Submit text="Valider" />
        </Form.Row>
      </Form>
    </div>
  );
}