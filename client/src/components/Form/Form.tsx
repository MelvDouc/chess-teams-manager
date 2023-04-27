import RouterLink from "@src/routing/RouterLink.jsx";
import cssClasses from "@src/components/Form/Form.module.scss";

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

Form.Group = ({ nameAndId, labelText, required, type, min, max, placeholder, value, updateValue }: {
  type: "text" | "textarea" | "number" | "email" | "password" | "date" | "time" | "datetime-local";
  nameAndId: string;
  labelText: string;
  required?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
  value?: any;
  updateValue?: (value: any) => void;
}) => {
  const control: HTMLInputElement | HTMLTextAreaElement = (type === "textarea")
    ? <textarea>{value ?? ""}</textarea>
    : <input type={type} value={value ?? ""} />;

  control.id = nameAndId;
  control.classList.add("form-control");
  control.name = nameAndId;
  control.required = !!required;
  if (min !== undefined)
    control.setAttribute("min", String(min));
  if (max !== undefined)
    control.setAttribute("max", String(max));
  if (placeholder)
    control.placeholder = placeholder;
  if (updateValue) {
    switch (type) {
      case "number":
        control.addEventListener("input", () => updateValue((control as HTMLInputElement).valueAsNumber));
        break;
      case "datetime-local":
        control.addEventListener("input", () => updateValue((control as HTMLInputElement).valueAsDate));
        break;
      default:
        control.addEventListener("input", () => updateValue(control.value));
    }
  }

  return (
    <div>
      <label htmlFor={nameAndId} className="form-label">{labelText}</label>
      {control}
    </div>
  );
};

Form.Checkbox = ({ nameAndId, labelText, required, checked, updateValue }: {
  nameAndId: string;
  labelText: string;
  required?: boolean;
  checked?: boolean;
  updateValue?: (value: boolean) => void;
}) => {
  return (
    <div className="h-100 d-flex align-items-center">
      <div classNames={["form-check", "form-switch"]}>
        <input
          classNames={["form-check-input", cssClasses.formSwitchInput]}
          type="checkbox"
          role="switch"
          id={nameAndId}
          checked={checked === true}
          required={required === true}
          $init={(element) => {
            if (updateValue)
              element.addEventListener("change", () => updateValue(element.checked));
          }}
        />
        <label
          className="form-check-label"
          htmlFor={nameAndId}
        >{labelText}</label>
      </div>
    </div>
  );
};

Form.Select = ({ nameAndId, labelText, required, values, updateValue }: {
  nameAndId: string;
  labelText: string;
  required?: boolean;
  values: {
    value: string | number;
    text: string;
    selected?: boolean;
  }[];
  updateValue?: (value: any) => void;
}) => {
  return (
    <div>
      <label htmlFor={nameAndId} className="form-label d-block">{labelText}</label>
      <select
        name={nameAndId}
        className="form-control"
        id={nameAndId}
        required={required}
        $init={(element) => {
          if (updateValue)
            element.addEventListener("change", () => updateValue(element.value));
        }}
      >
        {values.map(({ value, text, selected }) => (
          <option value={value} selected={selected}>{text}</option>
        ))}
      </select>
    </div>
  );
};

Form.Submit = ({ text, backLink }: {
  text: string;
  backLink?: string;
}) => {
  return (
    <Form.Row>
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button classNames={["btn", "btn-success"]}>{text}</button>
        {backLink
          ? <RouterLink href={backLink} className="link-danger">Annuler</RouterLink>
          : null}
      </div>
    </Form.Row>
  );
};