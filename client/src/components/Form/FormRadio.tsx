import { CheckedInputProps } from "./form.types.js";

export default function FormRadio({ id, name, labelText, checked, handleInput }: CheckedInputProps & {
  name: string;
}) {
  return (
    <div className="form-check">
      <input
        type="radio"
        id={id}
        name={name}
        className="form-check-input"
        checked={checked === true}
        oninput={({ target }) => handleInput((target as HTMLInputElement).checked)}
      />
      <label className="form-check-label" htmlFor={id}>{labelText}</label>
    </div>
  );
}