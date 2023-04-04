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

Form.Group = ({ nameAndId, labelText, required, type, value }: {
  type: "text" | "textarea" | "number" | "email" | "password";
  nameAndId: string;
  labelText: string;
  required?: boolean;
  value?: any;
}) => {
  const control: HTMLInputElement | HTMLTextAreaElement = (type === "textarea")
    ? <textarea>{value ?? ""}</textarea>
    : <input value={value ?? ""} />;

  control.id = nameAndId;
  control.name = nameAndId;
  control.required = !!required;

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