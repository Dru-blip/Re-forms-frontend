

interface ApiResponse<T>{
    msg:"success"|"error",
    data?:T
}


interface IForm{
    id:string,
    title:string,
    description:string,
    createdAt?:Date,
    fields:string,
    questions:IQuestion[]
}

type QuestionType='short'|'long'|'multi'|'checkbox'

interface IOption{
    id:number
    value:string
}

interface IQuestion{
    qid:string,
    id?:string,
    name:string,
    type:QuestionType,
    options?:string[],
    key?:string[],
    required:boolean,
    formId:string
}

interface IAnswer{
    id?:string,
    questionId:string
    name:string
    type:QuestionType
    value?:string[],
    submissionId:string,
}

interface ISubmission{
    id:string,
    date:Date,
    answers:IAnswer[],
    userId:string,
    formId:string
}

interface FormContextProps{
    form:IForm,
    setForm:React.Dispatch<React.SetStateAction<IForm>>,
    formQuestions:IQuestion[]
    // qorder:number[]
    setQuestions:React.Dispatch<React.SetStateAction<IQuestion[]>>
    deletedQuestions:IQuestion[]
    setDeletedQuestions:React.Dispatch<React.SetStateAction<IQuestion[]>>
}

export  type {IForm,IQuestion,FormContextProps,ApiResponse,QuestionType,IAnswer,ISubmission}