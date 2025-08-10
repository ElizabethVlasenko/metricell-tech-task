import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee } from "./apiEmployees";
import toast from "react-hot-toast";

export function useAddEmployee() {
  const queryClient = useQueryClient();

  const {
    isPending: isAdding,
    mutateAsync: addEmployeeAsync,
    error,
  } = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      toast.success("Employee added successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      toast.error("Failed to add employee");
      console.error("Error adding employee:", error);
    },
  });

  return {
    isAdding,
    addEmployeeAsync,
    error,
  };
}
