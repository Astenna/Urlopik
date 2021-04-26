using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Queries;
using Urlopik.Application.Services.VacationService;
using Urlopik.Persistence.Models;

namespace Urlopik.Controllers
{
    [Route("api/vacation")]
    [Authorize]
    [ApiController]
    public class VacationController : ControllerBase
    {
        private readonly IVacationService _vacationService;

        public VacationController (IVacationService vacationService)
        {
            _vacationService = vacationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery] VacationsQuery vacationsQuery)
        {
            var vacation = await _vacationService.GetVacations(vacationsQuery);
            return Ok(vacation);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
        {
            var vacation = await _vacationService.GetVacationByIdAsync(id);
            return Ok(vacation);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await _vacationService.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] VacationDto vacationDto)
        {
            var createdVacation = await _vacationService.AddAsync(vacationDto);
            return Ok(createdVacation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] VacationDto vacationDto)
        {
            var updatedVacation = await _vacationService.UpdateAsync(id, vacationDto);
            return Ok(updatedVacation);
        }

        [HttpPut("hr-acceptance/{id}")]
        public async Task<IActionResult> AcceptAsync([FromRoute] int id)
        {
            await _vacationService.HrAcceptAsync(id);
            return NoContent();
        }
    }
}