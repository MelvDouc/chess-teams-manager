import Form from "@src/components/Form/Form.jsx";
import FormOnlyPage from "@src/components/FormOnlyPage/FormOnlyPage.jsx";
import router from "@src/router.jsx";
import auth from "@src/utils/auth.js";

export default async function LoginPage() {
  const credentials = {
    ffeId: "",
    pwd: ""
  };

  return (
    <FormOnlyPage>
      <Form
        onsubmit={async (e) => {
          e.preventDefault();
          const isValidCredentials = await auth.checkCredentials(credentials);

          if (!isValidCredentials)
            return alert("Identifiants invalides.");
          router.navigate("/");
        }}
      >
        <section className="row">
          <article className="col-12">
            <h2 className="text-center">Connexion</h2>
          </article>
        </section>
        <section className="row">
          <article className="col-12">
            <Form.Group
              type="text"
              nameAndId="ffeId"
              labelText="N° FFE"
              handleInput={(ffeId) => credentials.ffeId = ffeId}
              required
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12">
            <Form.Group
              type="password"
              nameAndId="pwd"
              labelText="Mot de passe"
              handleInput={(password) => credentials.pwd = password}
              required
            />
          </article>
        </section>
        <Form.Submit text="Se connecter" />
        <section className="row">
          <article className="col">
            <p className="mt-2 mb-0">
              <router.link to="/oubli-mot-de-passe" className="link-no-hover">Mot de passe oublié ?</router.link>
            </p>
          </article>
        </section>
      </Form>
    </FormOnlyPage>
  );
}