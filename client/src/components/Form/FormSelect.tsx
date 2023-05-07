import { NameAndId, ValuedInputProps } from "./form.types.js";
import cssClasses from "./Form.module.scss";

function FormSelect({ nameAndId, labelText, required, values, handleInput }: ValuedInputProps & NameAndId & {
  values: {
    value: string;
    text: string;
    selected?: boolean;
  }[];
}) {
  return (
    <>
      <label htmlFor={nameAndId} classes={{
        "form-label": true,
        "d-block": true,
        [cssClasses.required]: required === true
      }}>
        {labelText}
      </label>
      <select
        className="form-control"
        id={nameAndId}
        name={nameAndId}
        required={required}
        $init={(element) => {
          if (handleInput)
            element.addEventListener("change", () => handleInput(element.value));
        }}
      >
        {values.map(({ value, text, selected }) => (
          <option value={value} selected={selected}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
}

export default FormSelect;
