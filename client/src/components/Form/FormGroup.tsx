import { FreeJSX } from "reactfree-jsx";

const FormGroup = <Type extends FreeJSX.Input["type"] | "textarea">({
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
  updateValue
}: InputOrTextareaProps<Type>): Type extends "textarea" ? HTMLTextAreaElement : HTMLInputElement => {
  const control: HTMLInputElement | HTMLTextAreaElement = (type === "textarea")
    ? <textarea>{value ?? ""}</textarea>
    : <input type={type} value={value ?? ""} />;

  control.id = nameAndId;
  control.classList.add("form-control");
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

  if (updateValue !== undefined) {
    switch (type) {
      case "number":
        control.addEventListener("input", () => updateValue((control as HTMLInputElement).valueAsNumber));
        break;
      case "date":
      case "time":
      case "month":
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

export default FormGroup;

type InputOrTextareaProps<Type extends (FreeJSX.Input["type"]) | "textarea"> = {
  type: Type;
  nameAndId: string;
  labelText: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
  updateValue?: (value: any) => void;
  min?: Type extends "textarea" ? never : number;
  max?: Type extends "textarea" ? never : number;
  pattern?: Type extends "textarea" ? never : string;
};