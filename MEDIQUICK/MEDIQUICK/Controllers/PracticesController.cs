using MEDIQUICK.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MEDIQUICK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PracticesController : ControllerBase
    {
        // GET: api/<PracticesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PracticesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PracticesController>
        [HttpPost("/GeneratePractice")]
        public List<Object> GeneratePractice([FromBody] Practice p)
        {
            return p.GeneratePractice(p.SelectedTopics, p.SelectedDiffLevels,p.UserId);
        }

        // PUT api/<PracticesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PracticesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
