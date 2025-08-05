using InterviewTest.Server.Model;
using Microsoft.EntityFrameworkCore;

namespace InterviewTest.Server.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        EmployeeDbContext _context;

        public EmployeeRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public void AddEmployee(Employee employee)
        {
            _context.Add(employee);
        }

        public void DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);

            if (employee != null)
            {
                _context.Remove(employee);
            }

            throw new Exception("Employee not found");
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            IEnumerable<Employee> employees = await _context.Employees.ToListAsync();
            return employees;
        }

        public void UpdateEmployee(Employee employee)
        {
            _context.Update(employee);
        }
    }


}
