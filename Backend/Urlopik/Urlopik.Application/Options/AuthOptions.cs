namespace Urlopik.Application.Options
{
    public class AuthOptions
    {
            public string Key { get; set; }

            public int AcessTokenLifetime { get; set; }

            public int RefreshTokenLifetime { get; set; }
    }
}
