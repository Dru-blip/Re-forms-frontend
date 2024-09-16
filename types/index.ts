import { Dispatch, SetStateAction } from "react";

export interface ApiResponse<T>{
    statusCode: number;
    path: string;
    message: string;
    data: T;
    timestamp: string;
}

export interface Form{
    id:string,
    title:string,
    description:string,
    createdAt?:Date,
    fields:string,
    settings:Settings
}


export interface Settings{
    id:string
    confirmationMessage:string
    responseLimit:number
    editResponse:boolean
    questionsRequiredDefault:boolean,
    anotherResponse:boolean,
    formId:string
}

export interface FormContextProps{
    formDetails:Form
    formSettings:Settings

    updateFormDetails:Dispatch<SetStateAction<Form>>
    updateFormSettings:Dispatch<SetStateAction<Settings>>,
}

