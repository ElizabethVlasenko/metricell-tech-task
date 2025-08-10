import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ListEmployeesPage from "./pages/ListEmployeesPage";
import Container from "./ui/Container";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          toastOptions={{
            className: "",
            duration: 5000,
            removeDelay: 1000,
            error: {
              duration: 4000,
              iconTheme: {
                primary: "oklch(0.577 0.245 27.325)",
                secondary: "white",
              },
            },
            success: {
              duration: 2000,
              iconTheme: {
                primary: "oklch(62.7% 0.194 149.214)",
                secondary: "white",
              },
            },
          }}
        />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Header />
        <Container className="bg-gray-50 flex-1">
          <ListEmployeesPage />
        </Container>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
