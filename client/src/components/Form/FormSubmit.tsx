import router from "@src/router.jsx";

export default function FormSubmit({ text, backLink }: {
  text: string;
  backLink?: string;
}) {
  return (
    <section className="d-flex flex-wrap justify-content-center gap-2 pt-4">
      <button type="submit" className="btn btn-primary">{text}</button>
      {backLink !== undefined && (
        <router.link to={backLink} className="btn btn-danger">Annuler</router.link>
      )}
    </section>
  );
}