using FluentValidation;
using System;

namespace Urlopik.Application.Dtos
{
    public class CreateVacationDto
    {
        public int TypeId { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public string Description { get; set; }
    }

    public class CreateVacationDtoValidator : AbstractValidator<CreateVacationDto>
    {
        public CreateVacationDtoValidator()
        {
            RuleFor(x => x.TypeId).NotEmpty();
            RuleFor(x => x.DateFrom).NotEmpty();
            RuleFor(x => x.DateTo).NotEmpty();
            RuleFor(x => x.DateTo).GreaterThanOrEqualTo(x => x.DateFrom);
        }
    }
}
