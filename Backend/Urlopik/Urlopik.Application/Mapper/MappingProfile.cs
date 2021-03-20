using AutoMapper;
using Urlopik.Application.Dtos;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDto, User>();
        }
    }
}
