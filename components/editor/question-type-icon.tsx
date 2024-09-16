import { NotepadText, Notebook, CircleDotIcon, SquareCheck } from "lucide-react"

interface Props{
    type:string
}

export default function DisplayQuestionTypeIcon({type}:Props) {
    switch (type) {
        case "short": {
            return <NotepadText className="w-4 h-4 mr-2" />
        }
        case "long": {
            return <Notebook className="w-4 h-4 mr-2" />
        }
        case "multi": {
            return <CircleDotIcon className="w-4 h-4 mr-2" />
        }
        case "checkbox": {
            return <SquareCheck className="w-4 h-4 mr-2" />
        }
        default: {
            return <></>
        }
    }
}