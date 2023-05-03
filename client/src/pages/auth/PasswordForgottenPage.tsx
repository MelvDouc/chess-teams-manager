import Modal from "@src/components/Modal/Modal.jsx";
import Form from "@src/components/Form/Form.jsx";
import { post } from "@src/utils/api.js";

export default function PasswordForgottenPage() {
  return (
    <>
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        <Form
          className="w--500"
          handleSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const postResult = await post<PasswordResetData, { success?: boolean; errors?: string[]; }>("/auth/password-forgotten", {
              ffeId: formData.get("ffeId") as string,
              baseUrl: location.origin + "/auth/nouveau-mot-de-passe/"
            });
            if (postResult?.errors)
              return alert(postResult.errors.join("\n"));
            Modal.setState({
              type: "success",
              message: "Un lien de réinitialisation vous a été envoyé par email.",
            });
          }}
        >
          <Form.Row>
            <h2 className="text-center">Demande de réinitialisation de mot de passe</h2>
          </Form.Row>
          <Form.Row>
            <Form.Group
              type="text"
              nameAndId="ffeId"
              labelText="N° FFE"
              required
            />
          </Form.Row>
          <Form.Row>
            <Form.Submit text="Valider" />
          </Form.Row>
        </Form>
      </div>
    </>
  );
}

type PasswordResetData = {
  ffeId: string;
  baseUrl: string;
};