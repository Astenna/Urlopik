using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Services.VacationTypes;

namespace Urlopik.Controllers
{
    [Route("api/types")]
    [Authorize]
    [ApiController]
    public class VacationTypeController : ControllerBase
    {
        private readonly IVacationTypeService _vacationTypeService;

        public VacationTypeController(IVacationTypeService vacationTypeService)
        {
            _vacationTypeService = vacationTypeService;
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] VacationTypeDto vacationDto)
        {
            var createdType = await _vacationTypeService.AddAsync(vacationDto);
            return Ok(createdType);
        }
    }
}
