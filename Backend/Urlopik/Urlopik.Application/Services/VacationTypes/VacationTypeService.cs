using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Exceptions;
using Urlopik.Persistence;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Services.VacationTypes
{
    public class VacationTypeService : IVacationTypeService
    {
        private readonly UrlopikDbContext _urlopikDbContext;
        private readonly IMapper _mapper;
        private readonly HttpContext _httpContext;

        public VacationTypeService(UrlopikDbContext urlopikDbContext, IMapper mapper,
            IHttpContextAccessor httpContextAccessor)
        {
            _urlopikDbContext = urlopikDbContext;
            _mapper = mapper;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public async Task<VacationType> AddAsync(VacationTypeDto typeDto)
        {
            var existingType = _urlopikDbContext.VacationTypes.SingleOrDefault(x => x.Name == typeDto.Name);
            if (existingType != null)
            {
                if (existingType.IsDeleted)
                {
                    existingType.IsDeleted = false;
                    await _urlopikDbContext.SaveChangesAsync();
                    return existingType;
                }
                else
                {
                    throw new ApiException($"VacationType {typeDto.Name} already exists!");
                }
            }

            var newType = _mapper.Map<VacationType>(typeDto);
            await _urlopikDbContext.AddAsync(newType);
            await _urlopikDbContext.SaveChangesAsync();
            return newType;
        }

        public List<VacationType> Get()
        {
            var types = _urlopikDbContext.VacationTypes.ToList();
            return types;
        }
    }
}
