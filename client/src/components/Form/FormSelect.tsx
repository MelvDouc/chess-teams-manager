const FormSelect = ({ nameAndId, labelText, required, values, updateValue }: {
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

export default FormSelect;