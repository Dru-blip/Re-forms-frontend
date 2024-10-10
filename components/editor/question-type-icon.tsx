import { CircleDotIcon, Notebook, SquareCheck } from "lucide-react";
import { Icon } from "@iconify-icon/react";

interface Props {
    type: string;
}

export default function DisplayQuestionTypeIcon({ type }: Props) {
    switch (type) {
        case "TEXT": {
            return <Notebook className="w-4 h-4 mr-2" />;
        }
        case "MULIT_CHOICE": {
            return <CircleDotIcon className="w-4 h-4 mr-2" />;
        }
        case "CHECKBOX": {
            return <SquareCheck className="w-4 h-4 mr-2" />;
        }
        case "SELECT": {
            return <Icon className="mr-2" icon="tabler:select" width="24" height="24" />;
        }
        default: {
            return <></>;
        }
    }
}
