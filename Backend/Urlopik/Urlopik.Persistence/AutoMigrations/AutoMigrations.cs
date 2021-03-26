using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using System.Linq;

namespace Urlopik.Persistence.AutoMigrations
{
    public class AutoMigrations<T> : IAutoMigrations where T : DbContext
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<AutoMigrations<T>> _logger;

        public AutoMigrations(IServiceScopeFactory serviceScopeFactory, ILogger<AutoMigrations<T>> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        public void ApplyMigrations()
        {
            using var serviceScope = _serviceScopeFactory.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<T>();

            if (AreAllMigrationsApplied(context))
            {
                _logger.LogInformation("Database migrations check: All migrations already applied.");
            }
            else
            {
                _logger.LogInformation("Not applied migrations found. Apllying new migrations started.");

                context.Database.Migrate();

                var connection = context.Database.GetDbConnection();

                // Npgsql (the ADO layer) needs to reload the types to discover the newly-added hstore
                // Npgsql bug desrived here: https://github.com/npgsql/efcore.pg/issues/292
                if (connection is NpgsqlConnection npgsqlConnection)
                {
                    npgsqlConnection.Open();
                    npgsqlConnection.ReloadTypes();
                    npgsqlConnection.Close();
                }

                _logger.LogInformation("Applying new migrations finished.");
            }
        }

        private bool AreAllMigrationsApplied(DbContext context)
        {
            var appliedMigrations = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(x => x.MigrationId);

            var createdMigartions = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(x => x.Key);

            return !createdMigartions.Except(appliedMigrations).Any();
        }
    }
}