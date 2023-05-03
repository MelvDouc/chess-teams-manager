import Form from "@src/components/Form/Form.jsx";
import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";

export default async function LoginPage() {
  const credentials = {
    ffeId: "",
    pwd: ""
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <Form
        className="w--500"
        handleSubmit={async (e) => {
          e.preventDefault();
          const isValidCredentials = await auth.logIn(credentials);

          if (!isValidCredentials)
            return alert("Identifiants invalides.");
          router.navigate("/");
        }}
      >
        <Form.Row>
          <h2 className="text-center">Connexion</h2>
        </Form.Row>
        <Form.Row>
          <Form.Group
            type="text"
            nameAndId="ffeId"
            labelText="N° FFE"
            updateValue={(ffeId) => credentials.ffeId = ffeId}
            required
          />
        </Form.Row>
        <Form.Row>
          <Form.Group
            type="password"
            nameAndId="pwd"
            labelText="Mot de passe"
            updateValue={(password) => credentials.pwd = password}
            required
          />
        </Form.Row>
        <Form.Row>
          <Form.Submit text="Se connecter" />
        </Form.Row>
        <Form.Row>
          <p className="mt-2 mb-0">
            <router.link to="/oubli-mot-de-passe" className="link-no-hover">Mot de passe oublié ?</router.link>
          </p>
        </Form.Row>
      </Form>
    </div>
  );
}