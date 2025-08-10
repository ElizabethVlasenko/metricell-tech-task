import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEmployeeById } from "./apiEmployees";
import toast from "react-hot-toast";

export function useEditEmployee() {
  const queryClient = useQueryClient();

  const {
    isPending: isEditing,
    mutateAsync: editEmployeeAsync,
    error,
  } = useMutation({
    mutationFn: editEmployeeById,
    onSuccess: () => {
      toast.success("Employee edited successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      toast.error("Failed to edit employee");
      console.error("Error editing employee:", error);
    },
  });

  return {
    isEditing,
    editEmployeeAsync,
    error,
  };
}
