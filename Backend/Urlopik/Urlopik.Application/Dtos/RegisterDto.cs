using FluentValidation;
using System;
using System.Text;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Dtos
{
    public class RegisterDto
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int? SupervisorId { get; set; }
    }

    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(x => x.Password.Length > 6);
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
        }
    }
}
