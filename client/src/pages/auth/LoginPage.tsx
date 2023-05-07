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
        onsubmit={async (e) => {
          e.preventDefault();
          const isValidCredentials = await auth.checkCredentials(credentials);

          if (!isValidCredentials)
            return alert("Identifiants invalides.");
          router.navigate("/");
        }}
      >
        <section className="row">
          <h2 className="text-center">Connexion</h2>
        </section>
        <section className="row">
          <Form.Group
            type="text"
            nameAndId="ffeId"
            labelText="N° FFE"
            handleInput={(ffeId) => credentials.ffeId = ffeId}
            required
          />
        </section>
        <section className="row">
          <Form.Group
            type="password"
            nameAndId="pwd"
            labelText="Mot de passe"
            handleInput={(password) => credentials.pwd = password}
            required
          />
        </section>
        <Form.Submit text="Se connecter" />
        <section className="row">
          <p className="mt-2 mb-0">
            <router.link to="/oubli-mot-de-passe" className="link-no-hover">Mot de passe oublié ?</router.link>
          </p>
        </section>
      </Form>
    </div>
  );
}