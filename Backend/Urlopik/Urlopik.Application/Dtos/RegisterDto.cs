using Urlopik.Persistence.Models;

namespace Urlopik.Application.Dtos
{
    public class RegisterDto
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public Roles Role { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string SupervisorId { get; set; }
    }
}
