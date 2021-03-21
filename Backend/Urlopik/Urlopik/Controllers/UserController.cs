using Financer.Application.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Services;
using Urlopik.Application.Services.Tokens;

namespace Urlopik.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UserController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        /// <summary>
        /// Register new users 
        /// </summary>
        /// <param name="registerDto"></param>
        /// <returns></returns>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDto registerDto)
        {
            await _userService.RegisterAsync(registerDto);
            return Ok();
        }

        /// <summary>
        /// Login 
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns></returns>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            if (_userService.LoginCredentialsValid(loginDto))
            {
                var jwt = _tokenService.CreateToken(loginDto.Email);
                return Ok(jwt);
            }
            else
            {
                return Unauthorized("Invalid login credentials!");
            }
        }
    }
}
