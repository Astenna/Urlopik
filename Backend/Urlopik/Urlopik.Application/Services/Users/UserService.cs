using AutoMapper;
using Financer.Application.Dtos;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Urlopik.Application.Dtos;
using Urlopik.Application.Exceptions;
using Urlopik.Persistence;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Services
{
    public class UserService : IUserService
    {
        private readonly UrlopikDbContext _urlopikDbContext;
        private readonly IMapper _mapper;
        private static readonly RNGCryptoServiceProvider RNGCryptoServiceProvider = new RNGCryptoServiceProvider();
        private static readonly int HashSaltSize = 80;
        private static readonly int HashIterationsCount = 10000;

        public UserService(UrlopikDbContext urlopikDbContext, IMapper mapper)
        {
            _urlopikDbContext = urlopikDbContext;
            _mapper = mapper;
        }

        public async Task RegisterAsync(RegisterDto registerDto)
        {
            if (IsEmailAlreadyInUse(registerDto.Email))
            {
                throw new ApiException($"Email: {registerDto.Email} already in use!");
            }

            var salt = new byte[HashSaltSize];
            RNGCryptoServiceProvider.GetBytes(salt);
            var hashedPassword = CreatePasswordHash(registerDto.Password, salt);

            var domainAccount = _mapper.Map<User>(registerDto);
            domainAccount.PasswordHash = hashedPassword;
            domainAccount.Salt = salt;

            await _urlopikDbContext.Users.AddAsync(domainAccount);
            await _urlopikDbContext.SaveChangesAsync();
        }

        public bool LoginCredentialsValid(LoginDto loginDto)
        {
            var account = _urlopikDbContext.Users.SingleOrDefault(x => x.Email.Equals(loginDto.Email));

            if (account is null)
            {
                throw new ApiException($"User with email: {loginDto.Email} doesn't exist!");
            }

            var givenPasswordHash = CreatePasswordHash(loginDto.Password, account.Salt);

            for (var i = 0; i < account.PasswordHash.Length; i++)
            {
                if (account.PasswordHash[i] != givenPasswordHash[i])
                {
                    return false;
                }
            }

            return true;
        }

        private bool IsEmailAlreadyInUse(string email)
        {
            return _urlopikDbContext.Users.Any(x => x.Email.Equals(email));
        }

        private byte[] CreatePasswordHash(string password, byte[] salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, HashIterationsCount);
            var hashedPassword = pbkdf2.GetBytes(HashSaltSize);
            return hashedPassword;
        }
    }
}
