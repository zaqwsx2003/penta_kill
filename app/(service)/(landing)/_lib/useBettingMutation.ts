import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useFirecracker } from "@/app/(service)/(landing)/_components/Firecracker";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { useBettingModalState } from "@/lib/bettingModalStore";

type BettingMutationProps = {
    setError: React.Dispatch<React.SetStateAction<string>>;
};

export default function useBettingMutation({ setError }: BettingMutationProps) {
    const { fireCrackerEffect } = useFirecracker();
    const { setBettingPhase, BettingOnClose } = useBettingModalState();
    const queryClient = useQueryClient();
    const axiosAuth = useAxiosAuth();

    const mutation = useMutation({
        mutationKey: ["betting"],
        mutationFn: async ({
            matchId,
            teamCode,
            point,
        }: {
            matchId: string;
            teamCode: string;
            point: number;
        }) => {
            try {
                const response = await axiosAuth.post(`points/bettings`, {
                    matchId,
                    teamCode,
                    point,
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["match", "betting"],
            });
            setBettingPhase(3);
            fireCrackerEffect();
            setError("");
        },
        onError: (error) => {
            setBettingPhase(0);
            setError("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
        },
    });

    return { mutation };
}
