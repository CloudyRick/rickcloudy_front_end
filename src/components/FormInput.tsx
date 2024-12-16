import { FormInputProps } from "../types/propType";
import React from "react";

const FormInput = (props: FormInputProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    props.onChange && props.onChange(e);
  };

  return (
    <>
      <label
        htmlFor={props.labelFor}
        className="block mb-2 text-sm font-mulish text-gray-900 dark:text-gray-900"
      >
        {props.inputLabel}
      </label>
      {props.inputType === "select" ? (
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5"
          id={props.inputId}
          name={props.inputName}
          onChange={handleChange} // Ensure type compatibility
          required={props.required}
        >
          <option value="">{props.placeholderText}</option>
          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5"
          type={props.inputType}
          id={props.inputId}
          name={props.inputName}
          placeholder={props.placeholderText}
          onChange={handleChange}
          required={props.required}
        />
      )}
    </>
  );
};

export default FormInput;
