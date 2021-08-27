import React, { useState } from "react";

function useFormInput(initialValue, forSpaces) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSpaces(e) {
    setValue(e.target.value.trim());
  }

  function handleEmailPasswordSpaces(e) {
    if (forSpaces === true) {
      if (e.key === " ") {
        e.preventDefault();
      }
    }
  }

  return {
    value,
    onChange: handleChange,
    onBlur: handleSpaces,
    onKeyPress: handleEmailPasswordSpaces,
  };
}

export default useFormInput;

// GENERATE_SOURCEMAP=false
// in .env file
