using InterviewTest.Server.Data;
using InterviewTest.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace InterviewTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        IEmployeeRepository _employeeRepository;

        public EmployeesController(IConfiguration config, IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Employee>> GetAsync()
        {
            return await _employeeRepository.GetAllEmployees();
        }
    }
}
