using LibraryManagementBackend.Models.Data;  // Adjust according to your namespace
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure the SQLite database context
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=Data/libraryManagementSystem.db"));

// Configure CORS if your frontend is on a different origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
        builder.WithOrigins("http://localhost:3000")  // React frontend URL
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials());
});

var app = builder.Build();

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Cross-Origin-Opener-Policy", "same-origin");
    await next();
});

// Ensure the database is created and seeded (if needed)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<LibraryContext>();
    // You can add logic here for database seeding if necessary
}

// Configure the HTTP request pipeline
app.UseCors("AllowOrigin");

app.UseAuthentication();  // Enable Authentication
app.UseAuthorization();   // Enable Authorization

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
