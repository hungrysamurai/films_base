import PropTypes from 'prop-types';

import { useState } from "react";

const FormInput = ({ label, handleSignUpChanges,...props }) => {

 const [labelActive, setLabelActive] = useState(false);

 const handleChange = (e) => {
  handleSignUpChanges(e);

  if(e.target.value.length !== 0){
   setLabelActive(true)
  } else {
   if(labelActive){
    setLabelActive(false)
   }
  }
 }

 return (
  <div className="form-input-group">

    <input {...props} onChange={handleChange} />
    <label className={labelActive ? 'active' : ''}>{label}</label>

  </div>
 )
}

FormInput.propTypes = {
  label: PropTypes.string,
  handleSignUpChanges: PropTypes.func,
}

export default FormInput;