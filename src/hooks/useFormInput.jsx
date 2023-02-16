import { useState } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    if (e.target && e.target.value) {
      setValue(e.target.value);
    } else {
      setValue(e);
    }
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}
