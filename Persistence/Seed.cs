using Domain;
using Persistence;
using System.Diagnostics;

namespace Persistance
{
    public class Seed
    {

        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Title = "Good Post 1",
                    Date = DateTime.Now,
                    Description = "Post 2 description",
                    Content = "Lorem Ipsum",
                    Category = "C#",
                },
                new Post
                {
                    Title = "Good Post 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Post 1description",
                    Content = "Lorem Ipsum",
                    Category = "Architecture",
                },
                new Post
                {
                    Title = "Super Post 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Post 1 description",
                    Content = "Lorem Ipsum",
                    Category = "Architecture",
                },
                new Post
                {
                    Title = "Super Post 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Post 2 description",
                    Content = "Lorem Ipsum",
                    Category = "DevOps",
                },
                new Post
                {
                    Title = "Super Post 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Post 3 description",
                    Content = "Lorem Ipsum",
                    Category = "C#",
                },
                new Post
                {
                    Title = "Super Post 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Post 4 description",
                    Content = "Lorem Ipsum",
                    Category = "C#",
                },
                new Post
                {
                    Title = "Super Post 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Post 5 description",
                    Content = "Lorem Ipsum",
                    Category = "C#",
                },
                new Post
                {
                    Title = "Super Post 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Post 6 description",
                    Content = "Lorem Ipsum",
                    Category = "DevOps",
                },
                new Post
                {
                    Title = "Super Post 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Post 2 description",
                    Content = "Lorem Ipsum",
                    Category = "React",
                },
                new Post
                {
                    Title = "Super Post 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Post 8 description",
                    Content = "Lorem Ipsum",
                    Category = "Databases",
                }
            };

            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }


    }
}
