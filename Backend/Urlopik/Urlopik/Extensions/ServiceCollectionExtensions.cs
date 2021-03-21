using Microsoft.AspNetCore.Builder;
using Urlopik.Middleware;

namespace Urlopik.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GlobalExceptionMiddleware>();
        }
    }
}
