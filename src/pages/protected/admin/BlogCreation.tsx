import FormInput from "../../../components/FormInput";
import { FormInputProps } from "../../../types/propType";


const inputList: FormInputProps[] = [{ 
        inputLabel: 'Blog Title',
        labelFor: 'blogTitle',
        inputType: 'text',
        inputId: 'blogTitle',
        inputName: 'blogTitle',
        placeholderText: 'Insert your blog title',
        required: true, 
    },
    
]

const BlogCreation = () => {
    
    return(
        <>
            <div>
                { inputList.map((input: FormInputProps) => (
                <FormInput inputLabel={input.inputLabel}
                            labelFor={input.labelFor}
                            inputType={input.inputType}
                            inputId={input.inputId}
                            inputName={input.inputName}
                            placeholderText={input.placeholderText}
                            required={input.required}/>
                )) }
            </div>
        </>
        
        
    )
}

export default BlogCreation