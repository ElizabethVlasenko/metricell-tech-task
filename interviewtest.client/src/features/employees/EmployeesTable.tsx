import { Plus } from "lucide-react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import AddEmployee from "./AddEmployee";
import EmployeeRow from "./EmployeeRow";
import { useEmployees } from "./useEmployees";

export default function EmployeesTable() {
  const { isLoading, employees = [], error } = useEmployees();

  const totalNumberOfEmployees = employees.length;

  if (isLoading) {
    return (
      <div className="text-xl font-medium text-center p-10 text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xl font-medium text-center p-10 text-gray-600">
        Error loading employees: {error?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <Table columns="grid-cols-[auto_1fr_1fr_auto]">
      <Table.Header>
        <div role="columnheader">Id</div>
        <div role="columnheader">Name</div>
        <div role="columnheader">Value</div>
        <div role="columnheader">
          <Modal>
            <Modal.Open opens="newEmployee">
              <Button size="small" className="flex gap-2 items-center">
                <Plus className="size-5" /> New entry
              </Button>
            </Modal.Open>
            <Modal.Window name="newEmployee">
              <AddEmployee />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Header>

      <Table.Body
        data={employees}
        render={(employee) => {
          return <EmployeeRow key={employee.id} employee={employee} />;
        }}
      />

      <Table.Footer>
        <div className="flex justify-between w-full">
          <p>Total</p>
          <p>{totalNumberOfEmployees}</p>
        </div>
      </Table.Footer>
    </Table>
  );
}
