import { Pen, Trash } from "lucide-react";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { type Employee } from "../../utils/types/employeesTypes";
import EditEmployee from "./EditEmployee";
import { useDeleteEmployee } from "./useDeleteEmployee";

type EmployeeRowType = {
  employee: Employee;
};

export default function EmployeeRow({ employee }: EmployeeRowType) {
  const { isDeleting, deleteEmployee, error } = useDeleteEmployee();
  const { id, name, value } = employee;

  return (
    <Table.Row>
      <p className="text-gray-800">{id}</p>
      <p className="text-gray-800">{name}</p>
      <p className="text-gray-800">{value}</p>
      <div className="flex md:gap-2 gap-1">
        <Modal>
          <Modal.Open opens="editEmployee">
            <Button variant="secondary" size="small">
              <span className="hidden md:block">Edit</span>
              <span className="md:hidden">
                <Pen className="size-4" />
              </span>
            </Button>
          </Modal.Open>
          <Modal.Open opens="deleteEmployee">
            <Button variant="danger" size="small">
              <span className="hidden md:block">Delete</span>
              <span className="md:hidden">
                <Trash className="size-4" />
              </span>
            </Button>
          </Modal.Open>

          <Modal.Window name="editEmployee">
            <EditEmployee initialValues={employee} />
          </Modal.Window>
          <Modal.Window name="deleteEmployee">
            <ConfirmDelete
              resourceName="employee record"
              disabled={isDeleting}
              onConfirm={() => deleteEmployee(id)}
              error={error}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}
