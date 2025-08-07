import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EmployeesTable from "./features/employees/EmployeesTable";
import Container from "./ui/Container";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Header />
        <Container className="bg-gray-50 flex-1">
          <main>
            <EmployeesTable />
          </main>
        </Container>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
