import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "./apiEmployees";

export function useEmployees() {
  const {
    isLoading,
    data: employees,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getAllEmployees(),
  });

  return {
    isLoading,
    employees,
    error,
  };
}
