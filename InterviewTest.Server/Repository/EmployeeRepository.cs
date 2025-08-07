using InterviewTest.Server.Data;
using InterviewTest.Server.Model;
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

        public async Task<bool> AddEmployee(Employee employee)
        {

            var employeeToUpdate = await _context.Employees.FindAsync(employee.Id);

            if (employee == null)
            {
                throw new KeyNotFoundException($"Employee with ID {employeeToUpdate.Id} not found.");
            }
            var result = await _context.AddAsync(employee);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                throw new KeyNotFoundException($"Employee with ID {id} not found.");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateEmployee(Employee employee)
        {
            var employeeToUpdate = await _context.Employees.FindAsync(employee.Id);

            if (employee == null)
            {
                throw new KeyNotFoundException($"Employee with ID {employeeToUpdate.Id} not found.");
            }

            _context.Entry(employeeToUpdate).CurrentValues.SetValues(employee);
            await _context.SaveChangesAsync();

            return true;
        }
    }


}
