using Microsoft.EntityFrameworkCore;

namespace DotNetCoreAPI_CRUD_Backend.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
