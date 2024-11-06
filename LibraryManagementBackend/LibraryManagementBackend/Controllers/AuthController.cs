using LibraryManagementBackend.Models.Data;
using LibraryManagementSystem.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly LibraryContext _context;
        private readonly ILogger<AuthController> _logger; // Add the logger field
        

        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public AuthController(IConfiguration configuration, LibraryContext context)
        {
            _configuration = configuration;
            _context = context;
            
        }

        // Google Authentication callback endpoint
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin()
        {
            var authenticateResult = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);
            if (!authenticateResult.Succeeded)
            {
                return Unauthorized(new { message = "Google authentication failed." });
            }

            var googleUser = authenticateResult.Principal;

            // Extracting the Google ID, Email, and Name from the authentication result
            var googleId = googleUser.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = googleUser.FindFirstValue(ClaimTypes.Email);
            var name = googleUser.FindFirstValue(ClaimTypes.Name);

            // Check if user already exists in the database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                // If user doesn't exist, create a new user
                user = new User
                {
                    Email = email,
                    Name = name,
                    GoogleId = googleId // Save the Google ID
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            // Return the user details (without JWT)
            return Ok(new { User = user });
        }
       

        // Traditional Login endpoint (email and password)
        /*[HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            // Check if the model is null or if email/password are missing
            if (model == null || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Invalid request. Email or Password is missing.");
                Console.WriteLine("This is a log message.");
                Console.WriteLine($"Received Username: {model.Email}");
                Console.WriteLine($"Received Email: {model.Password}");
            }

            try
            {
                // Check if the user exists in the database
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == model.Email);

                // If the user does not exist or the password doesn't match, return unauthorized
                if (user == null || user.Password != model.Password)  // Compare plain text password (this should be hashed in a real-world scenario)
                {
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                // Proceed to generate a JWT token (this part will depend on your existing logic)
               
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                _logger.LogError(ex, "An error occurred during login.");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        */

        // Helper method to generate JWT token
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    // Model for login request (email and password)
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
