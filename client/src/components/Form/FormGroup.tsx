import { FreeJSX } from "reactfree-jsx";
import { ValuedInputProps, NameAndId } from "./form.types.js";
import cssClasses from "./Form.module.scss";

export default function FormGroup<Type extends FreeJSX.InputProps["type"] | "textarea">({
  type,
  nameAndId,
  labelText,
  required,
  disabled,
  min,
  max,
  placeholder,
  pattern,
  value,
  handleInput,
  $init
}: InputOrTextareaProps<Type>): Type extends "textarea" ? HTMLTextAreaElement : HTMLInputElement {
  const control: HTMLInputElement | HTMLTextAreaElement = (type === "textarea")
    ? <textarea>{value ?? ""}</textarea>
    : <input type={type} value={value as string ?? ""} />;

  control.classList.add("form-control");
  control.id = nameAndId;
  control.name = nameAndId;
  control.required = required === true;
  control.disabled = disabled === true;

  if (min !== undefined)
    control.setAttribute("min", String(min));
  if (max !== undefined)
    control.setAttribute("max", String(max));
  if (placeholder)
    control.placeholder = placeholder;
  if (pattern)
    (control as HTMLInputElement).pattern = pattern;
  if ($init)
    $init(control);

  if (handleInput !== undefined) {
    switch (type) {
      case "number":
        control.addEventListener("input", () => handleInput((control as HTMLInputElement).valueAsNumber));
        break;
      case "date":
      case "time":
      case "month":
      case "datetime-local":
        control.addEventListener("input", () => handleInput((control as HTMLInputElement).valueAsDate));
        break;
      default:
        control.addEventListener("input", () => handleInput(control.value));
    }
  }

  return (
    <>
      <label htmlFor={nameAndId} classes={{
        "form-label": true,
        [cssClasses.required]: required === true
      }}>{labelText}</label>
      {control}
    </>
  );
}

interface InputOrTextareaProps<Type extends FreeJSX.InputProps["type"] | "textarea">
  extends ValuedInputProps, NameAndId {
  type: Type;
  placeholder?: string;
  min?: Type extends "textarea" ? never : number;
  max?: Type extends "textarea" ? never : number;
  pattern?: Type extends "textarea" ? never : string;
  $init?: (element: HTMLInputElement | HTMLTextAreaElement) => void;
};
