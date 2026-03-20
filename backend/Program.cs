var builder = WebApplication.CreateBuilder(args);

// Allow React frontend to call this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseSwagger();
app.UseSwaggerUI();

// Root endpoint - just says API is running
app.MapGet("/", () => "Backend API is running!");

// Returns a list of items (React will show this)
app.MapGet("/api/items", () =>
{
    var items = new[]
    {
        new { Id = 1, Name = "Apple",  Price = 1.50 },
        new { Id = 2, Name = "Banana", Price = 6.75 },
        new { Id = 3, Name = "Cherry", Price = 4.00 }
    };
    return Results.Ok(items);
});

// Health check - Kubernetes uses this to check if app is alive
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.Run();