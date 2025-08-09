using InterviewTest.Server.Controllers;
using InterviewTest.Server.Data;
using InterviewTest.Server.Model;
using InterviewTest.Server.Model.DTO;
using Microsoft.EntityFrameworkCore;

namespace InterviewTest.Server.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private EmployeeDbContext _context;
        private ILogger<ListController> _logger;


        public EmployeeRepository(EmployeeDbContext context, ILogger<ListController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            IEnumerable<Employee> employees = await _context.Employees.ToListAsync();
            return employees;
        }

        public async Task<Employee> AddEmployee(EmployeeCreateDto employee)
        {
            Employee employeeToAdd = new Employee
            {
                Name = employee.Name,
                Value = employee.Value
            };

            var result = await _context.AddAsync(employeeToAdd);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Employee created successfully: {employeeToAdd.Name} with Value: {employeeToAdd.Value}");

            return result.Entity;

        }

        public async Task<bool> UpdateEmployee(EmployeeUpdateDto employee, int id)
        {
            var employeeToUpdate = await _context.Employees.FindAsync(id);

            if (employeeToUpdate == null)
            {
                _logger.LogWarning($"Employee with ID {id} was not found for update.");
                return false;
            }

            if (!string.IsNullOrEmpty(employee.Name))
            {
                _logger.LogInformation($"Updating employee ID {id} name from {employeeToUpdate.Name} to {employee.Name}");
                employeeToUpdate.Name = employee.Name;
            }
            if (employee.Value != null)
            {
                _logger.LogInformation($"Updating employee ID {id} value from {employeeToUpdate.Value} to {employee.Value}");
                employeeToUpdate.Value = (int)employee.Value;
            }

            await _context.SaveChangesAsync();

            _logger.LogInformation($"Employee with ID {id} was successfully updated.");
            return true;
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                _logger.LogWarning($"Employee with ID {id} was not found for deletion.");
                return false;
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Employee with ID {id} was successfully deleted.");
            return true;
        }
    }

}
