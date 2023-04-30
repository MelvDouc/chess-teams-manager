import RouterLink from "@src/routing/RouterLink.jsx";

const FormSubmit = ({ text, backLink }: {
  text: string;
  backLink?: string;
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
      <button classNames={["btn", "btn-success"]} type="submit">{text}</button>
      {backLink
        ? <RouterLink href={backLink} className="link-danger">Annuler</RouterLink>
        : null}
    </div>
  );
};

export default FormSubmit;