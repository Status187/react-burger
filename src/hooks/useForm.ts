import * as React from 'react';
import { IStateForm } from './interfaces';

export function useForm(inputValues: IStateForm, submitForm: (prevState: {
  name?: string;
  email: string;
  password?: string;
  wasSubmit?: boolean;
  token?: string;
}) => void) {
  const [values, setValues] = React.useState<IStateForm>(inputValues);

  const onSubmit = React.useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (submitForm) {
      const prevState = { ...values };
      delete prevState.wasSubmit;
      submitForm(prevState);
      setValues({ ...values, wasSubmit: true });
    }
  }, [submitForm, values]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }, [values]);
  return { values, setValues, handleChange, onSubmit };
};
