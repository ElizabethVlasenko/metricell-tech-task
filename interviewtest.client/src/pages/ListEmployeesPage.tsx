import EmployeesTable from "../features/employees/EmployeesTable";
import ListActions from "../features/list/ListActions";
import Heading from "../ui/Heading";

export default function ListEmployeesPage() {
  return (
    <main className="py-4">
      <section className="mb-6 flex flex-col gap-4">
        <Heading>List Actions</Heading>
        <ListActions />
      </section>
      <section className="flex flex-col gap-4">
        <Heading>Employees</Heading>
        <EmployeesTable />
      </section>
    </main>
  );
}
