import RouterLink from "@routing/RouterLink.jsx";
import cssClasses from "@components/Form/Form.module.scss";
import btnClasses from "@styles/btn.module.scss";

export default function Form({ handleSubmit, children }: {
  handleSubmit: (e: SubmitEvent) => any;
  children?: ComponentChildren;
}) {
  return (
    <form className={cssClasses.form} onsubmit={handleSubmit}>{children}</form>
  );
}

Form.Row = ({ children }: { children?: ComponentChildren; }) => {
  return (
    <section className={cssClasses.formRow}>{children}</section>
  );
};

Form.Group = ({ nameAndId, labelText, required, type, placeholder, value }: {
  type: "text" | "textarea" | "number" | "email" | "password" | "checkbox";
  nameAndId: string;
  labelText: string;
  required?: boolean;
  placeholder?: string;
  value?: any;
}) => {
  const control: HTMLInputElement | HTMLTextAreaElement = (type === "textarea")
    ? <textarea>{value ?? ""}</textarea>
    : <input type={type} value={value ?? ""} />;

  control.id = nameAndId;
  control.name = nameAndId;
  control.required = !!required;
  if (placeholder)
    control.placeholder = placeholder;
  if (type === "checkbox")
    (control as HTMLInputElement).checked = !!value;

  if (type === "checkbox")
    return (
      <div classNames={[cssClasses.formGroup, cssClasses.checkbox]}>
        {control}
        <label htmlFor={nameAndId}>{labelText}</label>
      </div>
    );

  return (
    <div className={cssClasses.formGroup}>
      <label htmlFor={nameAndId}>{labelText}</label>
      {control}
    </div>
  );
};

Form.Submit = ({ text, backLink }: {
  text: string;
  backLink: string;
}) => {
  return (
    <Form.Row>
      <div className={cssClasses.formSubmit}>
        <button classNames={[btnClasses.btn, btnClasses.btnGreen]}>{text}</button>
        <RouterLink href={backLink}>Annuler</RouterLink>
      </div>
    </Form.Row>
  );
};