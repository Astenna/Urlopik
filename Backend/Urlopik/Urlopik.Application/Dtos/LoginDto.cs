using FluentValidation;

namespace Financer.Application.Dtos
{
    public class LoginDto
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }

    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(x => x.Password.Length > 6);
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}