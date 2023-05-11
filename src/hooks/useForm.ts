import * as React from 'react';

export function useForm(inputValues: any) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (e: { target: { value: string; name: string; }; }) => {
    const {value, name} = e.target;
    setValues({...values, [name]: value});
  };
  return {values, setValues, handleChange };
};
