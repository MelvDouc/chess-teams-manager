import FormCheckbox from "./FormCheckbox.jsx";
import FormGroup from "./FormGroup.jsx";
import FormSelect from "./FormSelect.jsx";
import FormSubmit from "./FormSubmit.jsx";

export default function Form({ handleSubmit, children }: {
  handleSubmit: (e: SubmitEvent) => any;
  children?: FreeJSX.ComponentChildren;
}) {
  return (
    <form
      className="d-flex flex-column text-light bg-primary bg-gradient p-3 gap-3 rounded"
      onsubmit={handleSubmit}
    >{children}</form>
  );
}

Form.Row = ({ children }: { children?: FreeJSX.ComponentChildren; }) => {
  const row = (
    <section className="row"></section>
  );

  if (Array.isArray(children))
    children.forEach((child) => {
      row.append(
        <div className={`col-sm-${12 / children.length}`}>{child}</div>
      );
    });

  return row;
};

Form.Group = FormGroup;
Form.Checkbox = FormCheckbox;
Form.Select = FormSelect;
Form.Submit = FormSubmit;