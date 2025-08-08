import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementValues } from "./apiList";

export function useIncrementValues() {
  const queryClient = useQueryClient();

  const {
    isPending: isLoading,
    mutateAsync: incrementValuesAsync,
    error,
  } = useMutation({
    mutationFn: incrementValues,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error executing the increment function:", error);
    },
  });

  return {
    isLoading,
    incrementValuesAsync,
    error,
  };
}
