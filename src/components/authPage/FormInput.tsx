import { ChangeEvent, InputHTMLAttributes } from "react";
import { useState } from "react";

type FormInputProps = {
  label: string;
  handleSignUpChanges: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: React.FC<FormInputProps> = ({
  label,
  handleSignUpChanges,
  ...props
}) => {
  const [labelActive, setLabelActive] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSignUpChanges(e);

    if (e.target.value.length !== 0) {
      setLabelActive(true);
    } else {
      if (labelActive) {
        setLabelActive(false);
      }
    }
  };

  return (
    <div className="form-input-group">
      <input {...props} onChange={handleChange} />
      <label className={labelActive ? "active" : ""}>{label}</label>
    </div>
  );
};

export default FormInput;
