"use client"

import { createContext, use, useState } from "react";
import { IForm, FormContextProps } from "../types";



const FormContext=createContext<FormContextProps>({} as FormContextProps)


export const FormProvider=({children}:{children:React.ReactNode})=>{
    const [form,setForm]=useState({} as IForm)
    //question ordering
    // const [qorder,setQOrder]=useState<number[]>([])
    return (
        <FormContext.Provider value={{form,setForm}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext