"use client"

import { createContext, use, useState } from "react";
import { Form, FormContextProps,Settings } from "../types";



const FormContext=createContext<FormContextProps>({} as FormContextProps)

interface FormProviderProps{
    details:Form,
    children:React.ReactNode
}


export const FormProvider=({children,details}:FormProviderProps)=>{
    const [formDetails,setFormDetails]=useState(details)
    const [formSettings,setFormSettings]=useState<Settings>(details.settings)

    return (
        <FormContext.Provider value={{formDetails,updateFormDetails:setFormDetails,updateFormSettings:setFormSettings,formSettings}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext