using Application;
using Application.BlogActions.Query;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json");
builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            });


builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        //todo change for production.
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("*");
    });
});
//Allow connection from client-app to server-side.
builder.Services.AddMediatR(typeof(GetPostsList.Handler));
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);


var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("CorsPolicy");
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();
        await Seed.SeedData(context);
    }
catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured during migration");
    }

app.Run();