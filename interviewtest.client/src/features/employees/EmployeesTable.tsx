import { useEmployees } from "./useBookings";

export default function EmployeesTable() {
  const { isLoading, employees, error } = useEmployees();

  const employeeCount = employees ? employees.length : 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        Connectivity check:{" "}
        {employeeCount > 0 ? `OK (${employeeCount})` : `NOT READY`}
      </div>
      {error && <div>Error: something went wrong</div>}
      <div>Complete your app here</div>
    </>
  );
}
