import cssClasses from "@src/components/Form/Form.module.scss";

const FormCheckbox = ({ nameAndId, labelText, required, checked, updateValue }: {
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

export default FormCheckbox;