import * as React from 'react';

export function useForm(inputValues: any, submitForm: any) {
  const [values, setValues] = React.useState(inputValues);

  const onSubmit = React.useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (submitForm) {
        const prevState = { ...values };
        delete prevState.wasSubmit;
        submitForm(prevState);
        setValues({ ...values, wasSubmit: true });
    }
  }, [submitForm, values]);

  const handleChange = (e: { target: { value: string; name: string; }; }) => {
    const {value, name} = e.target;
    setValues({...values, [name]: value});
  };
  return {values, setValues, handleChange, onSubmit};
};
