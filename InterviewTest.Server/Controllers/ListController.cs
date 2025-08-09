using InterviewTest.Server.Model;
using InterviewTest.Server.Repository;
using Microsoft.AspNetCore.Mvc;

namespace InterviewTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase
    {
        private IListRepository _listRepository;
        private ILogger<ListController> _logger;

        public ListController(IListRepository listRepository, ILogger<ListController> logger)
        {
            _listRepository = listRepository;
            _logger = logger;
        }


        [HttpPost]
        public async Task<IActionResult> IncrementValuesAsync()
        {
            bool result = await _listRepository.IncrementValues();
            if (result)
                return Ok("Values incremented successfully.");
            else
            {
                _logger.LogWarning("An error occurred. No values were incremented.");
                return BadRequest("No values were incremented.");
            }
        }

        [HttpGet]
        public async Task<IEnumerable<ListViewModel>> GetEmployeeValueSumAsync()
        {
            return await _listRepository.GetEmployeeValueSum();
        }
    }
}
