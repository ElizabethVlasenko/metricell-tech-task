import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeesTable from "./features/employees/EmployeesTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EmployeesTable />
    </QueryClientProvider>
  );
}

export default App;
