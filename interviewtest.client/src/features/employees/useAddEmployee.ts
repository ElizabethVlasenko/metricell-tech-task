import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee } from "./apiEmployees";

export function useAddEmployee() {
  const queryClient = useQueryClient();

  const {
    isPending: isAdding,
    mutateAsync: addEmployeeAsync,
    error,
  } = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Error adding employee:", error);
    },
  });

  return {
    isAdding,
    addEmployeeAsync,
    error,
  };
}
