using InterviewTest.Server.Data;
using InterviewTest.Server.Model;
using InterviewTest.Server.Model.DTO;
using Microsoft.EntityFrameworkCore;

namespace InterviewTest.Server.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        EmployeeDbContext _context;

        public EmployeeRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            IEnumerable<Employee> employees = await _context.Employees.ToListAsync();
            return employees;
        }

        public async Task<Employee> AddEmployee(EmployeeCreateDto employee)
        {
            if (employee == null)
            {
                return new Employee();
            }

            Employee employeeToAdd = new Employee
            {
                Name = employee.Name,
                Value = employee.Value
            };

            var result = await _context.AddAsync(employeeToAdd);
            await _context.SaveChangesAsync();

            return result.Entity;

        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return false;
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateEmployee(Employee employee)
        {
            var employeeToUpdate = await _context.Employees.FindAsync(employee.Id);

            if (employeeToUpdate == null)
            {
                return false;
            }

            _context.Entry(employeeToUpdate).CurrentValues.SetValues(employee);
            await _context.SaveChangesAsync();

            return true;
        }
    }


}
