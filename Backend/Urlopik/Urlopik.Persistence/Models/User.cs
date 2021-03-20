using System.ComponentModel.DataAnnotations;

namespace Urlopik.Persistence.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        public Roles Role { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public int? SupervisorId { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] Salt { get; set; }

        public User Supervisor { get; set; }
    }
}
