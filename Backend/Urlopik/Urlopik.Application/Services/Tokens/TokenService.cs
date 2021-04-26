using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Urlopik.Application.Exceptions;
using Urlopik.Application.Options;
using Urlopik.Application.ViewModels;
using Urlopik.Persistence;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Services.Tokens
{
    public class TokenService : ITokenService
    {
        private readonly UrlopikDbContext _urlopikDbContext;
        private readonly IOptions<AuthOptions> _authOptions;

        public TokenService(UrlopikDbContext dbContext, IOptions<AuthOptions> authOptions)
        {
            _urlopikDbContext = dbContext;
            _authOptions = authOptions;
        }

        public Jwt CreateToken(string email)
        {
            var account = _urlopikDbContext.Users.SingleOrDefault(x => x.Email.Equals(email));
            if (account is null)
            {
                throw new ApiException($"Account with email: {email} not found!");
            }

            // TODO: refresh token implementation
            var accessToken = CreateAccessToken(account);

            return new Jwt
            {
                AccessToken = accessToken
            };
        }

        private string CreateAccessToken(User user)
        {
            var claims = new List<Claim> {
                new Claim("email", user.Email),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName),
                new Claim("role", user.Role.ToString())
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var credentitals = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authOptions.Value.Key)),
                SecurityAlgorithms.HmacSha256);

            var signedJwt = new JwtSecurityToken(
                null, null, claims,
                expires: DateTime.UtcNow.AddMinutes(_authOptions.Value.AcessTokenLifetime),
                signingCredentials: credentitals);

            return tokenHandler.WriteToken(signedJwt);
        }
    }
}
