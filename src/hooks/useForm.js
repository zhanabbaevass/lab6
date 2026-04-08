import { useState, useCallback, useRef } from "react";

export default function useForm({ initialValues = {}, validate = () => ({}) }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const refs = useRef({});

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleChange = useCallback(
    (event) => {
      const { name, value, type, checked } = event.target;
      setFieldValue(name, type === "checkbox" ? checked : value);
    },
    [setFieldValue]
  );

  const register = useCallback(
    (name) => ({
      name,
      value: values[name] ?? "",
      onChange: handleChange,
      ref: (element) => {
        if (element) refs.current[name] = element;
      },
    }),
    [values, handleChange]
  );

  const handleSubmit = useCallback(
    (onSubmit) => async (event) => {
      if (event?.preventDefault) event.preventDefault();
      const nextErrors = validate(values);
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length === 0) {
        await onSubmit(values, refs.current);
      }
    },
    [validate, values]
  );

  const resetForm = useCallback(
    (nextValues = initialValues) => {
      setValues(nextValues);
      setErrors({});
      refs.current = {};
    },
    [initialValues]
  );

  return {
    values,
    errors,
    register,
    handleSubmit,
    setFieldValue,
    resetForm,
    refs,
  };
}
