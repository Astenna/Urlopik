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
            RuleFor(x => x.Role)
                .Must(x => IsDefined(x))
                .WithMessage(x => $"{x.Role} is not a valid role, choose from: {GetAvailableRoles()}");
        }


        private bool IsDefined(string value)
        {
            try
            {
                _ = (Roles)Enum.Parse(typeof(Roles), value);
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        private string GetAvailableRoles()
        {
            StringBuilder result = new StringBuilder();

            foreach (var value in Enum.GetValues(typeof(Roles)))
            {
                result.Append(value);
                result.Append(" ");
            }

            return result.ToString();
        }
    }
}
