﻿using Domain;
using MediatR;
using Persistence;

namespace Application.BlogActions.Query
{
    public class GetSinglePost
    {
        public class Query : IRequest<Post>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Post>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Post> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Posts.FindAsync(request.Id);
            }
        }
    }
}
