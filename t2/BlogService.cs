using System;
using System.Collections.Generic;
using System.Linq;

namespace Blog
{
    public class BlogService
    {
        private readonly MyDbContext _dbContext;

        public BlogService(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<NumberOfCommentsByUserDto> NumberOfCommentsPerUser()
        {
            return _dbContext.BlogComments
                .GroupBy(x => x.UserName)
                .Select(grouping => new NumberOfCommentsByUserDto
                {
                    UserName = grouping.Key,
                    Count = grouping.Count()
                })
                .ToList();
        }

        public List<PostWithLastCommentDto> PostsOrderedByLastCommentDate()
        {
            return _dbContext.BlogPosts
                .GroupJoin(
                    _dbContext.BlogComments,
                    post => post.Id,
                    comment => comment.BlogPostId,
                    (post, comments) => new
                    {
                        Post = post,
                        LastComment = comments.OrderByDescending(x => x.CreatedDate).FirstOrDefault()
                    }
                )
                .OrderByDescending(x => x.LastComment != null ? x.LastComment.CreatedDate : DateTime.MinValue)
                .Select(x => new PostWithLastCommentDto
                {
                    PostTitle = x.Post.Title,
                    LastCommentCreatedDate = x.LastComment.CreatedDate,
                    LastCommentText = x.LastComment.Text,
                })
                .ToList();
        }

        public List<NumberOfCommentsByUserDto> NumberOfLastCommentsLeftByUser()
        {
            return _dbContext.BlogPosts
                .GroupJoin(
                    _dbContext.BlogComments,
                    post => post.Id,
                    comment => comment.BlogPostId,
                    (post, comments) => new
                    {
                        Post = post,
                        LastComment = comments.OrderByDescending(x => x.CreatedDate).FirstOrDefault()
                    }
                )
                .GroupBy(x => x.LastComment.UserName)
                .Select(x => new NumberOfCommentsByUserDto()
                {
                    UserName = x.Key,
                    Count = x.Count()
                })
                .ToList();
        }
    }
}
