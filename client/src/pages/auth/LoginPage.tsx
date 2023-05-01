import Form from "@src/components/Form/Form.jsx";
import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";

export default async function LoginPage() {
  const credentials = {
    ffeId: "",
    pwd: ""
  };

  return (
    <div className="container-sm">
      <section className="mb-3">
        <h2>Connexion</h2>
        <Form
          handleSubmit={async (e) => {
            e.preventDefault();
            const isValidCredentials = await auth.logIn(credentials);

            if (!isValidCredentials)
              return alert("Identifiants invalides.");
            router.navigate("/");
          }}
        >
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
        </Form>
      </section>
      <section>
        <p>
          <router.link to="/auth/oubli-mot-de-passe">Mot de passe oublié ?</router.link>
        </p>
      </section>
    </div>
  );
}