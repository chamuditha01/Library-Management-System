using LibraryManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementBackend.Models
{
    public class Book
    {
        public int BookId { get; set; }  // Primary Key

        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Author is required.")]
        public string Author { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        public int UserId { get; set; }  // Foreign Key

       
    }
}
