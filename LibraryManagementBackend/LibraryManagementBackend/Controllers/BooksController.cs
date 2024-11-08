using LibraryManagementBackend.Models;
using LibraryManagementBackend.Models.Data; // Adjust according to your namespace
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Reflection.Metadata.BlobBuilder;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace LibraryManagementBackend.Controllers
{
    [Route("api/[controller]")] //base api URL https://localhost:5000/api/books
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/books
        //200 OK: Returns an array of all books.
        //500 Internal Server Error: If an unexpected error occurs.

        [HttpGet] //To fetch the books from forntend
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: api/books/{id}
        //200 OK: Returns the book details.
        //404 Not Found: If no book is found with the specified ID.
        //500 Internal Server Error: If an unexpected error occurs.

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // POST: api/books
        //Headers: Content-Type: application/json
        //201 Created: The book was successfully created, and the location header will point to the newly created book.
        //400 Bad Request: If validation fails or the data is invalid.
        //500 Internal Server Error: If an error occurs while saving the book.

        [HttpPost] //To add a new book

        public async Task<IActionResult> PostBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)  // Check for validation errors
            {
                var errors = ModelState
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage)
                    .ToList();

                return BadRequest(new { errors });
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }



        // PUT: api/books/{id}
        //Headers:Content-Type: application/json

        [HttpPut("{id}")] //To update a book
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest("Book ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/books/{id}
        //204 No Content: The book was successfully deleted.
        //404 Not Found: If the book with the specified ID does not exist.
        //500 Internal Server Error: If an unexpected error occurs.

        [HttpDelete("{id}")] //To delete a book
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.BookId == id);
        }
    }
}
