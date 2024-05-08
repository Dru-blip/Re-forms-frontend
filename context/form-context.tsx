"use client"

import { createContext, use, useState } from "react";
import { IForm, FormContextProps, IQuestion } from "../types";



const FormContext=createContext<FormContextProps>({} as FormContextProps)


export const FormProvider=({children}:{children:React.ReactNode})=>{
    const [form,setForm]=useState({} as IForm)
    const [formQuestions,setQuestions]=useState<IQuestion[]>([])
    const [deletedQuestions,setDeletedQuestions]=useState<IQuestion[]>([])
    //question ordering
    // const [qorder,setQOrder]=useState<number[]>([])
    return (
        <FormContext.Provider value={{form,setForm,formQuestions,setQuestions,deletedQuestions,setDeletedQuestions}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext