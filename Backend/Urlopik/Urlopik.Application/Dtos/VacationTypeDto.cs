using FluentValidation;

namespace Urlopik.Application.Dtos
{
    public class VacationTypeDto
    {
        public string Name { get; set; }
    }


    public class VacationTypeDtoValidator : AbstractValidator<VacationTypeDto>
    {
        public VacationTypeDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}
