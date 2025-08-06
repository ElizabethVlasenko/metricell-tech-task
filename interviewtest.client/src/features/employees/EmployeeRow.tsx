import Table from "../../ui/Table";
import { type Employee } from "../../utils/types/employeesTypes";

type EmployeeRowType = {
  employee: Employee;
};

export default function EmployeeRow({
  employee: { id, name, value },
}: EmployeeRowType) {
  return (
    <Table.Row>
      <p>{id}</p>
      <p>{name}</p>
      <p>{value}</p>
    </Table.Row>
  );
}
