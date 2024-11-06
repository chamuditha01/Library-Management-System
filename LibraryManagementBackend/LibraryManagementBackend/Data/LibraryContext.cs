using LibraryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementBackend.Models.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)
        {
        }

        // Define DbSets for your entities
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }

        /*public static void SeedData(LibraryContext context)
        {
            // Seed Users if there are none
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User { Name = "John Doe", Email = "john@example.com", Password = "password123" },
                    new User { Name = "Jane Smith", Email = "jane@example.com", Password = "password456" }
                );

                context.SaveChanges();
            }

            // Seed Books if there are none
            if (!context.Books.Any())
            {
                context.Books.AddRange(
                    new Book { Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", Description = "A novel set in the Roaring Twenties, telling the story of Jay Gatsby's unrequited love for Daisy Buchanan.", UserId = 1 },
                    new Book { Title = "To Kill a Mockingbird", Author = "Harper Lee", Description = "A coming-of-age story centered around the moral growth of Scout Finch in the racially charged American South." , UserId = 1 },
                    new Book { Title = "1984", Author = "George Orwell", Description = "A dystopian novel set in a totalitarian society governed by Big Brother, exploring themes of surveillance and individuality." , UserId = 1 }
                   );

                context.SaveChanges();
            }
        }*/
    }
}
