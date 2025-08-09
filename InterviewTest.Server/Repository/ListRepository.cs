using InterviewTest.Server.Data;
using InterviewTest.Server.Model;
using Microsoft.EntityFrameworkCore;


namespace InterviewTest.Server.Repository
{
    public class ListRepository : IListRepository
    {
        private EmployeeDbContext _context;
        private ILogger<ListRepository> _logger;

        public ListRepository(EmployeeDbContext context, ILogger<ListRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<ListViewModel>> GetEmployeeValueSum()
        {
            IEnumerable<ListViewModel> result = await _context.Employees
                .Where(e =>
                e.Name.StartsWith("A") ||
                e.Name.StartsWith("B") ||
                e.Name.StartsWith("C"))
                .GroupBy(e => e.Name.Substring(0, 1))
                .Select(g => new ListViewModel
                {
                    StartingLetter = g.Key,
                    TotalValue = g.Sum(e => e.Value)
                })
                .Where(x => x.TotalValue >= 11171)
                .ToListAsync();

            if (result == null || !result.Any())
            {
                _logger.LogWarning("No employees found with the specified criteria.");
            }

            return result;
        }

        public async Task<bool> IncrementValues()
        {
            var result = await _context.Employees.ExecuteUpdateAsync
                 (s => s.SetProperty
                 (e => e.Value, e =>
                 e.Name.StartsWith("E") ? e.Value + 1 :
                 e.Name.StartsWith("G") ? e.Value + 10 :
                 e.Value + 100));

            if (result == 0)
            {
                _logger.LogWarning("No values were incremented. Check if any employees match the criteria.");
            }

            return result > 0;
        }
    }
}
