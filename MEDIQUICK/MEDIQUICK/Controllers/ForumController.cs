using MEDIQUICK.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MEDIQUICK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        // GET: api/<ForumController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ForumController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // GET: api/<ForumController>
        [HttpGet("topicid/{topicid}")]
        public List<Object> GetIssuesWithCommentCountByTopic(int topicid)
        {
            Issue i = new Issue();
            return i.GetIssuesWithCommentCountByTopic(topicid);
        }

        // GET: api/<ForumController>
        [HttpGet("issueId/{issueId}")]
        public List<Object> GetIssueWithComments(int issueId)
        {
            Issue i = new Issue();
            return i.GetIssueWithComments(issueId);
        }


        // POST api/<ForumController>
        [HttpPost("/InsertComment")]
        public int InsertComment([FromBody] Comment value)
        {
            return value.Insert();

        }

        // POST api/<ValuesController>
        [HttpPost("/InsertIssue")]
        public int InsertIssue([FromBody] Issue value)
        {
            return value.Insert();

        }



        // PUT api/<ForumController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpPatch("/updateIssueDetails")]
        public bool updateIssueDetails([FromBody] Issue issue)
        {
            return new Issue().updateIssueDetail(issue);
        }


        [HttpPatch("/updateCommentDetails")]
        public bool updateCommentDetail([FromBody] Comment comment)
        {
            return new Comment().updateCommentDetail(comment);
        }


        [HttpPatch("/toggleIssueStatus")]
        public Object toggleIssueStatus([FromBody] int issueid)
        {
            return new Issue().toggleIssueStatus(issueid);
        }

        [HttpPatch("/updateCommentInactive")]
        public bool updateCommentInactive([FromBody] Comment c)
        {
            return new Comment().updateCommentInactive(c);
        }

        // DELETE api/<ForumController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
