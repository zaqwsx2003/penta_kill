type CheckEmailProps = {
    setEmailMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
    setIsEmailValid: React.Dispatch<React.SetStateAction<boolean | null>>;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function useRegisterCheckEmail({
    setEmailMessage,
    setIsEmailValid,
    setError,
}: CheckEmailProps) {
    const checkEmailAvailability = async (email: string) => {
        try {
            const response = await fetch("/api/registerCheckEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                if (response.status === 200) {
                    setEmailMessage(data.message);
                    setIsEmailValid(true);
                }
            } else {
                setEmailMessage(data.message);
                setIsEmailValid(false);
                return false;
            }
        } catch (error) {
            setError("잘못된 요청 입니다.");
            setIsEmailValid(false);
            return false;
        }
    };
    return { checkEmailAvailability };
}
