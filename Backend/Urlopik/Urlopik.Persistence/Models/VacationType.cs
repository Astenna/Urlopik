using System.ComponentModel.DataAnnotations;

namespace Urlopik.Persistence.Models
{
    public class VacationType
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public bool IsDeleted { get; set; }
    }
}
