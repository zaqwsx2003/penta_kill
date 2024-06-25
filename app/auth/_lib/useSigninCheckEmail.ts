type CheckEmailProps = {
    setEmailError: React.Dispatch<React.SetStateAction<string | undefined>>;
    setEmailMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function useSigninCheckEmail({
    setEmailError,
    setEmailMessage,
}: CheckEmailProps) {
    const checkEmailAvailability = async (email: string) => {
        try {
            const response = await fetch("/api/signinCheckEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setEmailMessage(data.message);
                setEmailError("");
                return true;
            } else {
                setEmailError(data.message);
                setEmailMessage("");
                return false;
            }
        } catch (error) {
            setEmailError("잠시 후 다시 시도해 주세요");
            setEmailMessage("");
            return false;
        }
    };
    return { checkEmailAvailability };
}
