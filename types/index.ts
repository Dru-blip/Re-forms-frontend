
export interface ApiResponse<T> {
    statusCode: number;
    path: string;
    timestamp: string;
    message: string;
    data: T;
}

export interface Form {
    id: string;
    title: string;
    description: string;
    createdAt?: Date;
    fields: string;
    settings: Settings;
}

export interface Settings {
    id: string;
    confirmationMessage: string;
    responseLimit: number;
    editResponse: boolean;
    questionsRequiredDefault: boolean;
    anotherResponse: boolean;
    formId: string;
}

export type QuestionType = "TEXT" | "MULIT_CHOICE" | "CHECKBOX" | "SELECT";

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    order: number;
    isRequired: boolean;
    formId: string;
    options: Option[];
}

export interface Option {
    id: string;
    questionId: string;
    text: string;
    answerIds: string[];
    _count:{
        answers:number
    }
}

export interface Response {
    id: string;
    submittedDate: Date;
    answers: Answer[];
    formId: string;
    userId: string;
    form:Form
}

export interface Answer {
    id: string;
    text: string;
    options: Option[];
    optionIds: string[];
    questionId: string;
    responseId: string;
    question:Question
    formId: string;
}
