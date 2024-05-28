import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string;
}

export default function FormError({ message }: FormErrorProps) {
    if (!message) return null;
    if (message === "Request failed with status code 403") {
        message = "이메일 또는 비밀번호를 확인하세요";
    }

    return (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
            <ExclamationTriangleIcon />
            <p>{message}</p>
        </div>
    );
}
