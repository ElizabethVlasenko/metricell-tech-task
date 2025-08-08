export async function incrementValues() {
  try {
    const response = await fetch("api/list", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("List of employees could not be loaded");
  }
}

export async function getEmployeeValueSum() {
  try {
    const response = await fetch("api/list", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employee value sum");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Employee value sum could not be loaded");
  }
}
