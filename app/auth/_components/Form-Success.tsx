import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
    emailError?: string;
}

export default function FormSuccess({ message, emailError }: FormErrorProps) {
    if (!message && !emailError) return null;

    return (
        <>
            {message ? (
                <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
                    <CheckCircledIcon />
                    <p>{message}</p>
                </div>
            ) : (
                <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    <CheckCircledIcon />
                    <p>{emailError}</p>
                </div>
            )}
        </>
    );
}
