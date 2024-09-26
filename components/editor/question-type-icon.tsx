import { CircleDotIcon, Notebook, SquareCheck } from "lucide-react"

interface Props{
    type:string
}

export default function DisplayQuestionTypeIcon({type}:Props) {
    switch (type) {
        case "TEXT": {
            return <Notebook className="w-4 h-4 mr-2" />
        }
        case "MULIT_CHOICE": {
            return <CircleDotIcon className="w-4 h-4 mr-2" />
        }
        case "CHECKBOX": {
            return <SquareCheck className="w-4 h-4 mr-2" />
        }
        default: {
            return <></>
        }
    }
}