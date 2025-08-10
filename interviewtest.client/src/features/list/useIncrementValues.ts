import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementValues } from "./apiList";
import toast from "react-hot-toast";

export function useIncrementValues() {
  const queryClient = useQueryClient();

  const {
    isPending: isLoading,
    mutateAsync: incrementValuesAsync,
    error,
  } = useMutation({
    mutationFn: incrementValues,
    onSuccess: () => {
      toast.success("Increment values executed successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      toast.error("Failed to execute increment function");
      console.error("Error executing the increment function:", error);
    },
  });

  return {
    isLoading,
    incrementValuesAsync,
    error,
  };
}
