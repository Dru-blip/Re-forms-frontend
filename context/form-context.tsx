"use client";

import { createContext,  Dispatch,  SetStateAction,  useState } from "react";
import { Form,  Question, Settings } from "../types";


interface FormContextProps {
  formDetails: Form;
  formSettings: Settings;
  formQuestions: Question[];
  activeQuestion:Question|undefined
  updateActiveQuestion:Dispatch<SetStateAction<Question|undefined>>
  updateFormQuestions: Dispatch<SetStateAction<Question[]>>;
  updateFormDetails: Dispatch<SetStateAction<Form>>;
  updateFormSettings: Dispatch<SetStateAction<Settings>>;
}


const FormContext = createContext<FormContextProps>({} as FormContextProps);

interface FormProviderProps {
  details: Form;
  questions:Question[]
  children: React.ReactNode;
}

export const FormProvider = ({ children, details,questions }: FormProviderProps) => {
  const [formDetails, setFormDetails] = useState(details);
  const [formSettings, setFormSettings] = useState<Settings>(details.settings);
  const [formQuestions, setFormQuestions] = useState<Question[]>(questions);
  const [activeQuestion,setActiveQuestion]=useState<Question>()

  return (
    <FormContext.Provider
      value={{
        formDetails,
        updateFormDetails: setFormDetails,
        updateFormSettings: setFormSettings,
        formSettings,
        formQuestions: formQuestions,
        updateFormQuestions: setFormQuestions,
        activeQuestion,
        updateActiveQuestion:setActiveQuestion
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
