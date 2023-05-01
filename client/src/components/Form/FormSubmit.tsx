import router from "@src/router.jsx";

const FormSubmit = ({ text, backLink }: {
  text: string;
  backLink?: string;
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
      <button classNames={["btn", "btn-success"]} type="submit">{text}</button>
      {backLink
        ? <router.link to={backLink} className="link-danger">Annuler</router.link>
        : null}
    </div>
  );
};

export default FormSubmit;