import EmployeesTable from "../features/employees/EmployeesTable";
import ListActions from "../features/list/ListActions";
import Heading from "../ui/Heading";

export default function ListEmployeesPage() {
  return (
    <main className="flex justify-around gap-4 flex-col py-4">
      <Heading>List Actions</Heading>
      <ListActions />
      <Heading>Employees</Heading>
      <EmployeesTable />
    </main>
  );
}
