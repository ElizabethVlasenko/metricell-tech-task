using InterviewTest.Server.Model;
using InterviewTest.Server.Model.DTO;
using InterviewTest.Server.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace InterviewTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private IEmployeeRepository _employeeRepository;
        private ILogger<EmployeesController> _logger;

        public EmployeesController(IEmployeeRepository employeeRepository, ILogger<EmployeesController> logger)
        {
            _employeeRepository = employeeRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAsync()
        {
            try
            {
                var employees = await _employeeRepository.GetAllEmployees();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while fetching employees: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching employees.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] EmployeeCreateDto employee)
        {

            if (employee == null || string.IsNullOrEmpty(employee.Name) || employee.Value < 0)
            {
                _logger.LogError($"One or more of the employee properties are null or invalid. {JsonSerializer.Serialize(employee)}");
                return BadRequest("Invalid employee data.");
            }
            try
            {
                Employee result = await _employeeRepository.AddEmployee(employee);

                _logger.LogInformation($"Employee created successfully: {JsonSerializer.Serialize(result)}");
                return StatusCode(201, result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while creating an employee: {ex.Message}");
                return StatusCode(500, "An error occurred while adding an employee.");
            }
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] EmployeeUpdateDto employee)
        {

            if (employee == null || employee.Value < 0)
            {
                _logger.LogError($"One or more of the employee properties are null or invalid. {JsonSerializer.Serialize(employee)}");
                return BadRequest("Invalid employee data.");
            }
            try
            {
                bool result = await _employeeRepository.UpdateEmployee(employee, id);

                if (!result)
                {
                    _logger.LogWarning($"Employee with ID {id} not found or update failed.");
                    return BadRequest();
                }

                _logger.LogInformation($"Employee with ID {id} updated successfully: {JsonSerializer.Serialize(employee)}");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while updating an employee: {ex.Message}");
                return StatusCode(500, "An error occurred while adding an employee.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                _logger.LogError($"Invalid employee ID: {id}");
                return BadRequest();
            }

            try
            {
                bool result = await _employeeRepository.DeleteEmployee(id);

                if (!result) return BadRequest();

                _logger.LogInformation($"Employee with ID {id} deleted successfully");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while deleting an employee: {ex.Message}");
                return StatusCode(500, "An error occurred while deleting the employee.");
            }
        }
    }
}
