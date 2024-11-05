using LibraryManagementBackend.Models.Data; // Adjust according to your namespace
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure the SQLite database context
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=C:\\Users\\ASUS\\Desktop\\Expertenic Assignment\\libraryManagementSystem.db"));

// Optional: Configure CORS if your React frontend is on a different origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

// Uncomment to enable Swagger for API documentation
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure the database is created and seeded
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<LibraryContext>();
    // Call the SeedData method to populate the database if it's empty
    LibraryContext.SeedData(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Swagger middleware can be added here for development environment
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

// Use CORS middleware
app.UseCors("AllowOrigin");

app.UseHttpsRedirection();

// Uncomment if you want to use logging middleware
// app.UseSerilogRequestLogging(); // Requires Serilog to be set up

app.UseAuthorization();

// Map controllers to routes
app.MapControllers();

// Run the application
app.Run();
