using Microsoft.EntityFrameworkCore;
using Urlopik.Persistence.Models;

namespace Urlopik.Persistence
{
    public class UrlopikDbContext : DbContext
    {
        public UrlopikDbContext(DbContextOptions<UrlopikDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Vacation> Vacations { get; set; }
        
        public DbSet<VacationType> VacationTypes { get; set; }
    }
}
