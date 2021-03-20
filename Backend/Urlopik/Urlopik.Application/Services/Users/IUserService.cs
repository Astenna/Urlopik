using Financer.Application.Dtos;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;

namespace Urlopik.Application.Services
{
    public interface IUserService
    {
        bool LoginCredentialsValid(LoginDto loginDto);
        Task RegisterAsync(RegisterDto registerDto);
    }
}