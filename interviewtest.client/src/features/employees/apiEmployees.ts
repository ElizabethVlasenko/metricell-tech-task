import { Employees } from "../../utils/types/employeesTypes";

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
