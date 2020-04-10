using Microsoft.EntityFrameworkCore;

namespace CusDetails.Models
{
    public class CusDBContext:DbContext
    {
        public CusDBContext(DbContextOptions<CusDBContext>options ): base(options)
        {

        }
        public DbSet<Customer> Customers {get; set;}
    }
}