namespace Portfolio
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.AddJsonFile("appsettings.json");


            //builder.Services.AddCors(opt =>
            //{
            //    opt.AddPolicy("CorsPolicy", policy =>
            //    {
            //        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("*");
            //        //.AllowAnyOrigin();
            //        //.WithOrigins("http://localhost:3000");
            //    });

            //});

            var app = builder.Build();

            //app.MapGet("/", () => "Hello World!");

            //app.UseRouting();

            app.UseDefaultFiles();
            app.UseStaticFiles();


            //app.UseCors("CorsPolicy");

            ////app.UseEndpoints(endpoints =>
            ////{
            ////    endpoints.MapControllers();
            ////    endpoints.MapFallbackToController("Index", "FallBack");
            ////});

            app.Run();
        }
    }
}