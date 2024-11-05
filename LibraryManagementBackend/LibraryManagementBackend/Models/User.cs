using LibraryManagementBackend.Models;

using System.Collections.Generic;

namespace LibraryManagementSystem.Models
{
    public class User
    {
        public int UserId { get; set; }  // Primary Key
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        
    }
}
