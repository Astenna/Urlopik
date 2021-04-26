using System.Collections.Generic;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Queries;
using Urlopik.Application.ViewModels;

namespace Urlopik.Application.Services.VacationService
{
    public interface IVacationService
    {
        Task<VacationViewModel> AddAsync(VacationDto vacationDto);
        Task DeleteAsync(int vacationId);
        Task<VacationViewModel> GetVacationByIdAsync(int vacationId);
        Task<VacationViewModel> UpdateAsync(int vacationId, VacationDto vacationDto);
        Task<List<VacationViewModel>> GetVacations(VacationsQuery vacationsQuery);
        Task HrAcceptAsync(int vacationId);
    }
}