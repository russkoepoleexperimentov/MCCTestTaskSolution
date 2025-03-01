using System;

namespace Blog
{
    public class NumberOfCommentsByUserDto
    {
        public string UserName { get; set; }
        public int Count { get; set; }
    }

    public class PostWithLastCommentDto
    {
        public string PostTitle { get; set; }
        public string LastCommentText { get; set; }
        public DateTime LastCommentCreatedDate { get; set; }
    }
}
