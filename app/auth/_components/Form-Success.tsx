import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
}

export default function FormSuccess({ message }: FormErrorProps) {
    if (!message) return null;

    return (
        <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
            <CheckCircledIcon />
            <p>{message}</p>
        </div>
    );
}
