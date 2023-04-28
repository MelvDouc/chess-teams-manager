import Form from "@src/components/Form/Form.jsx";
import Router from "@src/routing/Router.js";
import RouterLink from "@src/routing/RouterLink.jsx";
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
            Router.navigate("/");
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
          <Form.Submit text="Se connecter" />
        </Form>
      </section>
      <section>
        <p>
          <RouterLink href="/auth/oubli-mot-de-passe">Mot de passe oublié ?</RouterLink>
        </p>
      </section>
    </div>
  );
}