using AutoMapper;
using Urlopik.Application.Dtos;
using Urlopik.Application.ViewModels;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<VacationDto, Vacation>();
            CreateMap<Vacation, VacationViewModel>()
                .ForMember(dest => dest.VacationerName, 
                    src => src.MapFrom(x => ConcatenateNameAndSurname(x.Vacationer)));
        }

        private string ConcatenateNameAndSurname(User user)
        {
            if(user?.FirstName == null && user?.LastName == null)
            {
                return string.Empty;
            }

            return $"{user?.FirstName} {user?.LastName}"; 
        }
    }
}
