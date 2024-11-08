﻿using LibraryManagementBackend.Models;
using System.Collections.Generic;

//Mapped to user table in db
namespace LibraryManagementSystem.Models
{
    public class User
    {
        public int UserId { get; set; }  // Primary Key
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; } // Nullable
        
    }
}
