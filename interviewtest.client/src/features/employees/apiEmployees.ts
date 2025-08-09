import {
  type Employee,
  type EmployeeDto,
  type Employees,
} from "../../utils/types/employeesTypes";

export async function getAllEmployees() {
  try {
    const response = await fetch("api/employees");

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    const data = (await response.json()) as Employees;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("List of employees could not be loaded");
  }
}

export async function deleteEmployeeById(id: number) {
  try {
    const response = await fetch(`api/employees/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    return id;
  } catch (error) {
    console.error(error);
    throw new Error("Employee could not be deleted");
  }
}

export async function editEmployeeById(employee: Employee) {

    const employeToUpdate: EmployeeDto = {
        name: employee.name,
        value: employee.value,
    }

    try {
        const response = await fetch(`api/employees/${employee.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
            body: JSON.stringify(employeToUpdate),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to edit employee");
    }

    return employee;
  } catch (error) {
    console.error(error);
    throw new Error("Employee could not be edited");
  }
}

export async function addEmployee(employee: EmployeeDto) {
  console.log(JSON.stringify(employee));
  try {
    const response = await fetch(`api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to edit employee");
    }

    return employee;
  } catch (error) {
    console.error(error);
    throw new Error("Employee could not be edited");
  }
}
