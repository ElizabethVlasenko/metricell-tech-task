import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployeeById } from "./apiEmployees";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteEmployee,
    error,
  } = useMutation({
    mutationFn: deleteEmployeeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
    },
  });

  return {
    isDeleting,
    deleteEmployee,
    error,
  };
}
