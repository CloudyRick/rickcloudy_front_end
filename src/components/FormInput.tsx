import { useEffect } from "react";
import { FormInputProps } from "../types/propType";


const FormInput = (props: FormInputProps) => {
    useEffect(() => {
        document.addEventListener("DOMContentLoaded", function() {
            props.required ? '' : document.getElementById(props.inputId)?.removeAttribute("required");
        })
    }, [])
    
    return(
        <>
            <label htmlFor={props.labelFor} className="block mb-2 text-sm font-mulish text-gray-900 dark:text-gray-900">{props.inputLabel}</label>
            <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type={props.inputType}
                id={props.inputId}
                name={props.inputName}
                placeholder={props.placeholderText}
                required />
        </>
    );
}

export default FormInput;