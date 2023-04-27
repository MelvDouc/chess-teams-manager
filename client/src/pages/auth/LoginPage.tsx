import Form from "@src/components/Form/Form.jsx";
import { login } from "@src/utils/api.js";
import { authTokenLocalStorageDataManager } from "@src/utils/local-storage.service.js";

export default async function LoginPage() {
  if (authTokenLocalStorageDataManager.getData())
    return location.assign("/matchs");

  const userData = {
    email: "",
    password: ""
  };

  return (
    <Form
      handleSubmit={async (e) => {
        e.preventDefault();
        const loginData = await login(userData);

        if (!loginData) {
          alert("Identifiants invalides.");
          return;
        }

        authTokenLocalStorageDataManager.setData(loginData.auth_token);
      }}
    >
      <Form.Row>
        <Form.Group
          type="email"
          nameAndId="email"
          labelText="Email"
          updateValue={(email) => userData.email = email}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="password"
          nameAndId="password"
          labelText="Mot de passe"
          updateValue={(password) => userData.password = password}
          required
        />
      </Form.Row>
      <Form.Submit text="Se connecter" />
    </Form>
  );
}