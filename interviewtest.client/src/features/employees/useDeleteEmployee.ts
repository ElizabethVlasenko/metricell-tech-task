import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployeeById } from "./apiEmployees";
import toast from "react-hot-toast";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeleting,
    mutate: deleteEmployee,
    error,
  } = useMutation({
    mutationFn: deleteEmployeeById,
    onSuccess: () => {
      toast.success("Employee deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      toast.error("Failed to delete employee");
      console.error("Error deleting employee:", error);
    },
  });

  return {
    isDeleting,
    deleteEmployee,
    error,
  };
}
