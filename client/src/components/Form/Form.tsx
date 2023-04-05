import RouterLink from "@routing/RouterLink.jsx";

export default function Form({ handleSubmit, children }: {
  handleSubmit: (e: SubmitEvent) => any;
  children?: ComponentChildren;
}) {
  return (
    <form onsubmit={handleSubmit}>{children}</form>
  );
}

Form.Row = ({ children }: { children?: ComponentChildren; }) => {
  return (
    <section className="form-row">{children}</section>
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

  return (
    <div className="form-group">
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
      <button>{text}</button>
      <RouterLink href={backLink}>Annuler</RouterLink>
    </Form.Row>
  );
};