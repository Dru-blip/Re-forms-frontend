

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
    questions:Map<number,IQuestion>
}

type QuestionType='short'|'long'|'multi'

interface IOption{
    id:number
    value:string
}

interface IQuestion{
    id:number,
    name:string,
    type:QuestionType,
    options?:string[]
}

interface IAnswer{
    qid:number
    name:string
    type:QuestionType
    answers?:string[]
}

interface ISubmission{
    id:string,
    date:Date,
    response:string,
    responseMap:Map<string,IAnswer>
    userId:string,
    formId:string
}

interface FormContextProps{
    form:IForm,
    setForm:React.Dispatch<React.SetStateAction<IForm>>,
    // qorder:number[]
    // setQOrder:React.Dispatch<React.SetStateAction<number[]>>
}

export  type {IForm,IQuestion,FormContextProps,ApiResponse,QuestionType,IAnswer,ISubmission}