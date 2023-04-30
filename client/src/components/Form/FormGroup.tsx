const FormGroup = ({ nameAndId, labelText, required, type, min, max, placeholder, value, updateValue, disabled }: {
  type: "text" | "textarea" | "number" | "email" | "password" | "date" | "time" | "datetime-local";
  nameAndId: string;
  labelText: string;
  required?: boolean;
  disabled?: boolean;
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
  if (disabled)
    control.disabled = true;
  if (updateValue) {
    switch (type) {
      case "number":
        control.addEventListener("input", () => updateValue((control as HTMLInputElement).valueAsNumber));
        break;
      case "date":
      case "time":
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