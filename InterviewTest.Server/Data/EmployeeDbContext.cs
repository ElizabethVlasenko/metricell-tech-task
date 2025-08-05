using InterviewTest.Server.Model;
using Microsoft.EntityFrameworkCore;

namespace InterviewTest.Server.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("Employees");
            modelBuilder.Entity<Employee>().HasKey(e => e.Id);
            modelBuilder.Entity<Employee>().Property(e => e.Name).HasMaxLength(50);
            modelBuilder.Entity<Employee>().Property(e => e.Value);
        }
    }
}
