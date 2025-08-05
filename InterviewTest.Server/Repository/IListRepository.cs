using InterviewTest.Server.Model;

namespace InterviewTest.Server.Repository
{
    public interface IListRepository
    {
        Task<bool> IncrementValues();
        Task<IEnumerable<ListViewModel>> GetEmployeeValueSum();
    }
}
