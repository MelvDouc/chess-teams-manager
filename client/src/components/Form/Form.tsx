import RouterLink from "@routing/RouterLink.jsx";

export default function Form({ handleSubmit, children }: {
  handleSubmit: (e: SubmitEvent) => any;
  children?: ComponentChildren;
}) {
  return (
    <form
      className="d-flex flex-column text-light bg-primary bg-gradient p-3 gap-3 rounded"
      onsubmit={handleSubmit}
    >{children}</form>
  );
}

Form.Row = ({ children }: { children?: ComponentChildren; }) => {
  const row = (
    <section className="row"></section>
  );

  if (Array.isArray(children))
    children.forEach((child) => {
      row.append(
        <div className="col">{child}</div>
      );
    });

  return row;
};

Form.Group = ({ nameAndId, labelText, required, type, placeholder, value }: {
  type: "text" | "textarea" | "number" | "email" | "password";
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
  control.classList.add("form-control");
  control.name = nameAndId;
  control.required = !!required;
  if (placeholder)
    control.placeholder = placeholder;

  return (
    <div>
      <label htmlFor={nameAndId} className="form-label">{labelText}</label>
      {control}
    </div>
  );
};

Form.Checkbox = ({ nameAndId, labelText, required, checked }: {
  nameAndId: string;
  labelText: string;
  required?: boolean;
  checked?: boolean;
}) => {
  return (
    <div className="h-100 d-flex align-items-center gap-2">
      <input type="checkbox" name={nameAndId} id={nameAndId} checked={checked === true} required={required === true} />
      <label htmlFor={nameAndId}>{labelText}</label>
    </div>
  );
};

Form.Submit = ({ text, backLink }: {
  text: string;
  backLink: string;
}) => {
  return (
    <Form.Row>
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button classNames={["btn", "btn-success"]}>{text}</button>
        <RouterLink href={backLink} className="link-danger">Annuler</RouterLink>
      </div>
    </Form.Row>
  );
};