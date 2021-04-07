using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using Urlopik.Persistence;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Tools
{
    public static class HttpContextExtensions
    {
        public static User GetUserUsingClaimsOrThrow(this HttpContext httpContext, UrlopikDbContext urlopikDbContext)
        {
            var emailFromClaims = httpContext.User.FindFirst("email").Value;
            var user = urlopikDbContext.Users.SingleOrDefault(x => x.Email.Equals(emailFromClaims));

            if (user is null)
            {
                throw new UnauthorizedAccessException();
            }

            return user;
        }
    }
}
