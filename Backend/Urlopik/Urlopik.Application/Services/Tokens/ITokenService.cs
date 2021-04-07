using Urlopik.Application.ViewModels;

namespace Urlopik.Application.Services.Tokens
{
    public interface ITokenService
    {
        Jwt CreateToken(string email);
    }
}