"use client";

import { useQuery } from "@tanstack/react-query";
import { getMatchPredictionList } from "./api";

export default function Querys() {
    const {
        data: match,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["match"],
        queryFn: getMatchPredictionList,
    });
}
