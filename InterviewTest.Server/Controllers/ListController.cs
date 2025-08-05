using InterviewTest.Server.Model;
using InterviewTest.Server.Repository;
using Microsoft.AspNetCore.Mvc;

namespace InterviewTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase
    {
        IListRepository _listRepository;

        public ListController(IListRepository listRepository)
        {
            _listRepository = listRepository;
        }


        [HttpPost]
        public async Task<IActionResult> IncrementValuesAsync()
        {
            bool result = await _listRepository.IncrementValues();
            if (result)
                return Ok("Values incremented successfully.");
            else
                return BadRequest("No values were incremented.");
        }

        [HttpGet]
        public async Task<IEnumerable<ListViewModel>> GetEmployeeValueSumAsync()
        {
            return await _listRepository.GetEmployeeValueSum();
        }
    }
}
