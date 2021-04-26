using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Exceptions;
using Urlopik.Application.Queries;
using Urlopik.Application.Tools;
using Urlopik.Application.ViewModels;
using Urlopik.Persistence;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Services.VacationService
{
    public class VacationService : IVacationService
    {
        private readonly UrlopikDbContext _urlopikDbContext;
        private readonly IMapper _mapper;
        private readonly HttpContext _httpContext;
        private readonly IVacationsQueryBuilder _queryBuilder;

        public VacationService(UrlopikDbContext urlopikDbContext, IMapper mapper, 
            IHttpContextAccessor httpContextAccessor, IVacationsQueryBuilder queryBuilder)
        {
            _urlopikDbContext = urlopikDbContext;
            _mapper = mapper;
            _httpContext = httpContextAccessor.HttpContext;
            _queryBuilder = queryBuilder;
        }

        public async Task<List<VacationViewModel>> GetVacations(VacationsQuery vacationsQuery)
        {
            var vacations = _urlopikDbContext.Vacations
                .Include(x => x.Type)
                .Include(x => x.Vacationer)
                .AsQueryable();

            var filteredVacations = await _queryBuilder.With(vacations)
                .SearchByEarlierThan(vacationsQuery.EarlierThan)
                .SearchByLaterThan(vacationsQuery.LaterThan)
                .SearchByTypeId(vacationsQuery.TypeId)
                .SearchByVacationerId(vacationsQuery.VacationerId)
                .SearchByDescription(vacationsQuery.Description)
                .SearchByHrAccepted(vacationsQuery.HrAccepted)
                .SearchBySupervisorAccepted(vacationsQuery.SupervisorAccepted)
                .AsQueryable()
                .ToListAsync();

            return _mapper.Map<List<VacationViewModel>>(filteredVacations);
        }

        public async Task<VacationViewModel> GetVacationByIdAsync(int vacationId)
        {
            var vacation = await GetVacationByIdOrThrowAsync(vacationId);
            var vacationViewModel = _mapper.Map<VacationViewModel>(vacation);
            return vacationViewModel;
        }

        public async Task<VacationViewModel> AddAsync(VacationDto vacationDto)
        {
            var user = _httpContext.GetUserUsingClaimsOrThrow(_urlopikDbContext);
            ValidateVactionTypeOrThrow(vacationDto.TypeId);

            var vacation = _mapper.Map<Vacation>(vacationDto);
            vacation.VacationerId = user.Id;
            await _urlopikDbContext.AddAsync(vacation);
            await _urlopikDbContext.SaveChangesAsync();

            return _mapper.Map<VacationViewModel>(vacation);
        }

        public async Task<VacationViewModel> UpdateAsync(int vacationId, VacationDto vacationDto)
        {
            var user = _httpContext.GetUserUsingClaimsOrThrow(_urlopikDbContext);
            var vacationToEdit = await GetVacationByIdOrThrowAsync(vacationId);

            if (vacationToEdit.VacationerId != user.Id)
            {
                throw new ApiException($"Vacation can be edited only by its owner");
            }

            ValidateVactionTypeOrThrow(vacationDto.TypeId);

            vacationToEdit.DateFrom = vacationDto.DateFrom;
            vacationToEdit.DateTo = vacationDto.DateTo;
            vacationToEdit.Description = vacationDto.Description;
            vacationToEdit.TypeId = vacationDto.TypeId;

            _urlopikDbContext.Update(vacationToEdit);
            await _urlopikDbContext.SaveChangesAsync();

            return _mapper.Map<VacationViewModel>(vacationToEdit);
        }

        public async Task DeleteAsync(int vacationId)
        {
            var user = _httpContext.GetUserUsingClaimsOrThrow(_urlopikDbContext);
            var vacationToRemove = await GetVacationByIdOrThrowAsync(vacationId);

            if (vacationToRemove.VacationerId != user.Id && user.Role != Roles.Administartor)
            {
                throw new ApiException($"Vacation can be edited only by its owner or by Administrator");
            }
            if (vacationToRemove.DateFrom < DateTime.Now)
            {
                throw new ApiException($"Vacation from the past cannot be removed");
            }

            _urlopikDbContext.Remove(vacationToRemove);
            await _urlopikDbContext.SaveChangesAsync();
        }

        public async Task HrAcceptAsync(int vacationId)
        {
            var vacationToAccept = await GetVacationByIdOrThrowAsync(vacationId);
            vacationToAccept.HrAccepted = true;
            _urlopikDbContext.Update(vacationToAccept);
            await _urlopikDbContext.SaveChangesAsync();
        }

        private async Task<Vacation> GetVacationByIdOrThrowAsync(int vacationId)
        {
            var vacation = await _urlopikDbContext.Vacations
                .Include(x => x.Vacationer)
                .SingleOrDefaultAsync(x => x.Id == vacationId);

            if (vacation is null)
            {
                throw new ApiException($"Vacation with id {vacationId} does not exist");
            }

            return vacation;
        }

        private void ValidateVactionTypeOrThrow(int vacationTypeId)
        {
            if (!_urlopikDbContext.VacationTypes.Any(x => x.Id == vacationTypeId && !x.IsDeleted))
            {
                throw new ApiException($"Vacation type with id {vacationTypeId} does not exist");
            }
        }
    }
}
