import FormCheckbox from "@src/components/Form/FormCheckbox.jsx";
import FormGroup from "@src/components/Form/FormGroup.jsx";
import FormRadio from "@src/components/Form/FormRadio.jsx";
import FormSelect from "@src/components/Form/FormSelect.jsx";
import FormSubmit from "@src/components/Form/FormSubmit.jsx";
import cssClasses from "./Form.module.scss";

const Form = ({ children, className, ...otherProps }: JSX.IntrinsicElements["form"] & { children?: any; }): HTMLFormElement => {
  return (
    <form
      className={cssClasses.form}
      {...otherProps}
    >{children}</form>
  );
};

Form.Checkbox = FormCheckbox;
Form.Group = FormGroup;
Form.Radio = FormRadio;
Form.Select = FormSelect;
Form.Submit = FormSubmit;

export default Form;