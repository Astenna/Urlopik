using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Urlopik.Persistence.AutoMigrations
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAutomigrations<T>(this IServiceCollection services, IConfiguration configuration) where T : DbContext
        {
            if (configuration.GetValue<bool>("AutoMigrations"))
            {
                services.AddSingleton<IAutoMigrations, AutoMigrations<T>>();
            }

            return services;
        }

        public static IApplicationBuilder UseAutoMigration(this IApplicationBuilder app)
        {
            foreach (var autoMigration in app.ApplicationServices.GetServices<IAutoMigrations>())
            {
                autoMigration?.ApplyMigrations();
            }

            return app;
        }
    }
}