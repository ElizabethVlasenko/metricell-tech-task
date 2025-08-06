import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeesTable from "./features/employees/EmployeesTable";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Container from "./ui/Container";

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
      <ReactQueryDevtools initialIsOpen={false} />
      <Container bgClassName="bg-gray-100">
        <EmployeesTable />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
