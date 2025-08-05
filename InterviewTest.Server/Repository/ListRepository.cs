using InterviewTest.Server.Data;
using InterviewTest.Server.Model;
using Microsoft.EntityFrameworkCore;


namespace InterviewTest.Server.Repository
{
    public class ListRepository : IListRepository
    {
        EmployeeDbContext _context;

        public ListRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ListViewModel>> GetEmployeeValueSum()
        {
            return await _context.Employees
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
        }

        public async Task<bool> IncrementValues()
        {
            return await _context.Employees.ExecuteUpdateAsync
                 (s => s.SetProperty
                 (e => e.Value, e =>
                 e.Name.StartsWith("E") ? e.Value + 1 :
                 e.Name.StartsWith("G") ? e.Value + 10 :
                 e.Value + 100)) > 0;
        }
    }
}
