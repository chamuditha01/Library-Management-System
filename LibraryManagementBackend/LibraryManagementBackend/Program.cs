using LibraryManagementBackend.Models.Data;  // Adjust according to your namespace
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Google;
using Google.Apis.Auth.OAuth2;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure the SQLite database context
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=C:\\Users\\ASUS\\Desktop\\Expertenic Assignment\\libraryManagementSystem.db"));

// Configure Google Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie() // Use cookie authentication
.AddGoogle(options =>
{
    options.ClientId = "1029470847404-g13c12gjvlhlhb4dk0tjo2jgs4rlmc02.apps.googleusercontent.com";
    options.ClientSecret = "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";
    // You can add more configuration options as needed
    options.SaveTokens = true;
    options.AccessType = "offline";
    options.Scope.Add("email");
});

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
