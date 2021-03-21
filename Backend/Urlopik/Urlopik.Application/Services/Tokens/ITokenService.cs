using Urlopik.Application.Dtos;

namespace Urlopik.Application.Services.Tokens
{
    public interface ITokenService
    {
        Jwt CreateToken(string email);
    }
}