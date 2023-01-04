using Application.BlogActions.Commands;
using Application.BlogActions.Query;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class PostsController : BaseApiController
    {
        private readonly DataContext _context;
        public PostsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] //api/posts
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            return await Mediator.Send(new GetPostsList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(Guid id)
        {
            return await Mediator.Send(new GetSinglePost.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> Create(Post post)
        {
            return Ok(await Mediator.Send(new CreatePost.Command { Post = post }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Post post)
        {
            post.Id = id;
            return Ok(await Mediator.Send(new EditPost.Command { Post = post }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await Mediator.Send(new DeletePost.Command { Id = id }));
        }
    }
}