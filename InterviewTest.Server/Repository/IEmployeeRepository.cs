using InterviewTest.Server.Model;
using InterviewTest.Server.Model.DTO;

namespace InterviewTest.Server.Repository
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployees();
        Task<Employee> AddEmployee(EmployeeCreateDto employee);
        Task<bool> UpdateEmployee(EmployeeUpdateDto employee, int id);
        Task<bool> DeleteEmployee(int id);
    }
}
