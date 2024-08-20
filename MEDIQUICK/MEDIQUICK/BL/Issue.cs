
using System.Net;

namespace MEDIQUICK.BL
{
    public class Issue
    {
        int issueId;
        int topicId;
        int userId;
        string title;
        string content;
        DateTime createdAt;
        bool isClosed;
        DBServices dbs = new DBServices();
        public Issue()
        {

        }
        public Issue(int issueId, int topicId, int userId, string title, string content, DateTime createdAt , bool isClosed)
        {
            this.issueId = issueId;
            this.topicId = topicId;
            this.userId = userId;
            this.title = title;
            this.content = content;
            this.createdAt = createdAt;
            this.isClosed = isClosed;

        }

        public int IssueId { get => issueId; set => issueId = value; }
        public int TopicId { get => topicId; set => topicId = value; }
        public int UserId { get => userId; set => userId = value; }
        public string Title { get => title; set => title = value; }
        public string Content { get => content; set => content = value; }
        public DateTime CreatedAt { get => createdAt; set => createdAt = value; }
        public bool IsClosed { get => isClosed; set => isClosed = value; }

        public List<object> GetIssuesWithCommentCountByTopic(int topicid)
        {
            return dbs.GetIssuesWithCommentCountByTopic(topicid);
        }

        public List<object> GetIssueWithComments(int issueId)
        {
            return dbs.GetIssueWithComments(issueId);
        }
        public int Insert()
        {
            return dbs.InsertIssue(this);
        }

        public bool updateIssueDetail(Issue issue)
        {
            return dbs.updateIssueDetail(issue);
        }

        public Object toggleIssueStatus(int issueid)
        {
            return dbs.toggleIssueStatus(issueid);
        }

    }
}
 