using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Exceptions;
using Urlopik.Application.Tools;
using Urlopik.Application.ViewModels;
using Urlopik.Persistence;

namespace Urlopik.Application.Services.VacationService
{
    public class VacationService
    {
        private readonly UrlopikDbContext _urlopikDbContext;
        private readonly IMapper _mapper;
        private readonly HttpContext _httpContext;

        public VacationService(UrlopikDbContext urlopikDbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _urlopikDbContext = urlopikDbContext;
            _mapper = mapper;
            _httpContext = httpContextAccessor.HttpContext;
        }

        //public async Task<List<VacationViewModel>> AddVacationAsync(CreateVacationDto vacationDto)
        //{
        //    var user = _httpContext.GetUserUsingClaimsOrThrow(_urlopikDbContext);
        //    if (_urlopikDbContext.VacationTypes.Any(x => x.Id == vacationDto.TypeId && !x.IsDeleted))
        //    {
        //        throw new ApiException($"Vacation with {vacationDto.TypeId} does not exists!");
        //    }
        //}
    }
}
