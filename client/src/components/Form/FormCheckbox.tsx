import { CheckedInputProps } from "./form.types.js";

export default function FormCheckbox({ id, labelText, checked, handleInput }: CheckedInputProps) {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        id={id}
        className="form-check-input"
        checked={checked === true}
        oninput={({ target }) => handleInput((target as HTMLInputElement).checked)}
      />
      <label className="form-check-label" htmlFor={id}>{labelText}</label>
    </div>
  );
}