import { useState } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    const type = typeof e;
    if (e.target && e.target.value) {
      setValue(e.target.value);
    } else if (type === "string" || type === "number") {
      setValue(e);
    } else {
      setValue("");
    }
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}
