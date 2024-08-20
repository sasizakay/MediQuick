using MEDIQUICK.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MEDIQUICK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        // GET: api/<TopicsController>
        [HttpGet]
        public IEnumerable<Topic> Get()
        {
            Topic t = new Topic();
            return t.GetTopics();
        }

        // GET api/<TopicsController>/5
        [HttpGet("UserID/{userID}")]
        public List<object> Get(int userID)
        {
            return  new Topic().GetUserProgress(userID);
        }

        // POST api/<TopicsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TopicsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TopicsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
