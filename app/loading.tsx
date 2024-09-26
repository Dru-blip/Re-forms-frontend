import { Loader2Icon } from "lucide-react";

export default function Loading() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Loader2Icon className="w-20 animate-spin" />
            <p>Loading</p>
        </div>
    );
}
