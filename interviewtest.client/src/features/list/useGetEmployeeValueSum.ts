import { useQuery } from "@tanstack/react-query";
import { getEmployeeValueSum } from "./apiList";

export function useGetEmployeeValueSum() {
  const {
    isLoading,
    data: listValueSum,
    error,
    refetch: refetchListValueSum,
  } = useQuery({
    queryKey: ["ListValueSum"],
    queryFn: () => getEmployeeValueSum(),
    enabled: false,
  });

  return {
    isLoading,
    listValueSum,
    error,
    refetchListValueSum,
  };
}
