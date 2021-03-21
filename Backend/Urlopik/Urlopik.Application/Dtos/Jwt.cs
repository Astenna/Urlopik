namespace Urlopik.Application.Dtos
{
    public class Jwt
    {
        public string AccessToken { get; set; }

        // TODO: implementation of refresh tokens
        public string RefreshToken { get; set; }
    }
}