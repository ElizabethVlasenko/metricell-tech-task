using InterviewTest.Server.Model;
using InterviewTest.Server.Model.DTO;
using InterviewTest.Server.Repository;
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
        public async Task<ActionResult<IEnumerable<Employee>>> GetAsync()
        {
            try
            {
                var employees = await _employeeRepository.GetAllEmployees();
                return Ok(employees);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while fetching employees.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] EmployeeCreateDto employee)
        {

            if (employee == null || string.IsNullOrEmpty(employee.Name) || employee.Value < 0)
            {
                return BadRequest("Invalid employee data.");
            }
            try
            {
                Employee result = await _employeeRepository.AddEmployee(employee);
                return StatusCode(201, result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while adding an employee.");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] Employee employee)
        {

            if (employee == null || string.IsNullOrEmpty(employee.Name) || employee.Value < 0)
            {
                return BadRequest("Invalid employee data.");
            }
            try
            {
                await _employeeRepository.UpdateEmployee(employee);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while adding an employee.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid employee ID.");
            }

            try
            {
                await _employeeRepository.DeleteEmployee(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while deleting the employee.");
            }
        }
    }
}
