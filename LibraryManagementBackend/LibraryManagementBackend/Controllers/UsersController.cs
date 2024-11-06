using Microsoft.AspNetCore.Mvc;
using LibraryManagementBackend.Models.Data;
using LibraryManagementBackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;

namespace LibraryManagementBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LibraryContext _context;

        public UsersController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            // 1. Validate the email format
            if (string.IsNullOrEmpty(user.Email) || !Regex.IsMatch(user.Email, @"^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"))
            {
                return BadRequest(new { message = "Invalid email format. Please provide a valid email." });
            }

            // 2. Validate the password length
            if (string.IsNullOrEmpty(user.Password) || user.Password.Length < 8)
            {
                return BadRequest(new { message = "Password must be at least 8 characters long." });
            }

            // 3. Check if the email already exists in the database
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "This email is already registered. Please log in or use another email." });
            }

            // 4. Hash the password before storing it
            var hasher = new PasswordHasher<User>();
            user.Password = hasher.HashPassword(user, user.Password);

            // 5. Save the user to the database
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Return a success response with a message
                return CreatedAtAction("GetUser", new { id = user.UserId }, new { message = "User created successfully.", user = user });
            }
            catch (Exception ex)
            {
                // Handle any errors during the save operation
                return StatusCode(500, new { message = "An error occurred while creating the user. Please try again later.", error = ex.Message });
            }
        
    }



    // PUT: api/users/5
    [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        // Add this code in your UsersController

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginRequest loginRequest)
        {
            /*// 1. Check if the email is provided and in a valid format
            if (string.IsNullOrEmpty(loginRequest.Email) || !Regex.IsMatch(loginRequest.Email, @"^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"))
            {
                return BadRequest(new { message = "Invalid email format. Please provide a valid email." });
            }

            // 2. Check if the password is provided
            if (string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest(new { message = "Password is required." });
            }
            */
            // 3. Retrieve the user from the database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // 4. Verify the password using PasswordHasher
            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(user, user.Password, loginRequest.Password);
            if (result != PasswordVerificationResult.Success)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // 5. Login successful
            return Ok(new { message = "Login successful.", userId = user.UserId });
        }

        // Define a model for the login request
        

    }
    
}
public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}