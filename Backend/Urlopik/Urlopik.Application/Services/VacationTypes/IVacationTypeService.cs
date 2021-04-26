using System.Collections.Generic;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Services.VacationTypes
{
    public interface IVacationTypeService
    {
        Task<VacationType> AddAsync(VacationTypeDto typeDto);

        List<VacationType> Get();
    }
}