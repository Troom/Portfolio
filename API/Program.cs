using Microsoft.EntityFrameworkCore;
using Persistance;
using Persistence;


//namespace PortfolioAPI
//{
//    public class Program
//    {
//        public static async void Main(string[] args)
//        {


            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.AddJsonFile("appsettings.json");
            builder.Services.AddControllers();


builder.Services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            });


            //builder.Services.AddCors(opt =>
            //{
            //    opt.AddPolicy("CorsPolicy", policy =>
            //    {
            //        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("*");
            //        //.AllowAnyOrigin();
            //        //.WithOrigins("http://localhost:3000");
            //    });
            //});
            //Allow connection from client-app to server-side.

            var app = builder.Build();

//app.UseRouting(); Not used yet
            app.MapControllers();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            //app.UseCors("CorsPolicy");

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
//        }
//    }
//}