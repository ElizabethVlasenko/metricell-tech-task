import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEmployeeById } from "./apiEmployees";

export function useEditEmployee() {
  const queryClient = useQueryClient();

  const {
    isPending: isEditing,
    mutateAsync: editEmployeeAsync,
    error,
  } = useMutation({
    mutationFn: editEmployeeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error editing employee:", error);
    },
  });

  return {
    isEditing,
    editEmployeeAsync,
    error,
  };
}
