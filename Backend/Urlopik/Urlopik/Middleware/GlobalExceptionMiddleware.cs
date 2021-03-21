using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Threading.Tasks;
using Urlopik.Application.Exceptions;

namespace Urlopik.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                if (context.Response.HasStarted)
                {
                    _logger.LogWarning(
                        "The response has already been sent to the client, the exception middleware will not be executed.");
                    throw;
                }

                await HandleExceptionAsync(context, ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<GlobalExceptionMiddleware> logger)
        {
            switch (ex)
            {
                case ApiException apiException:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    await context.Response.WriteAsync(apiException.Message);
                    break;
                //case FluentValidation.ValidationException validationException:
                    // TODO: Add fluent validations
                   // break;
                case UnauthorizedAccessException _:
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    break;
                default:
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    await context.Response.WriteAsync(ex.Message);
                    break;
            }

            context.Response.ContentType = "application/json";
            logger.LogWarning($"Error {context.Response} occurred during processing the request {context.Request}. " +
                $"Server responded with {context.Response.StatusCode}");
        }
    }
}
