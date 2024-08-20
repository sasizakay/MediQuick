using MEDIQUICK.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MEDIQUICK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return new User().ReadUsers();
        }

        [HttpPost("email/{email}/newStatus/{newStatus}")]
        public bool ChangeStatus(string email, bool newStatus)
        {
            //email/{email}/newStatus/{newStatus}
            return new User().ChangeUsersStatus(email, newStatus);
        }

        [HttpPost("email/{email}/newAdminStatus/{newAdminStatus}")]
        public bool ChangeAdminStatus(string email, bool newAdminStatus)
        {
            //email/{email}/newStatus/{newStatus}
            return new User().ChangeAdminStatus(email, newAdminStatus);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsersController>
        // ***Registration***
        [HttpPost]
        public User Post([FromBody] User user)
        {
            return user.InsertUser();
        }

        // POST api/<UsersController>
        // ***Log in***
        [HttpPost("{email}")]
        public User Login(string email, [FromBody] string password)
        {
            return new User().Login(email, password);
        }

        // POST api/<UsersController>
        [HttpPost("/ChangePassword")]
        public int ChangePassword([FromBody] ChangePassword o)
        {
            return new User().ChangePassword( o.userId, o.currentPassword, o.newPassword);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpPut("/updateUserDetails")]
        public bool updateUserDetail([FromBody] User u)
        {
            return new User().updateUserDetail(u);
        }


        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("UserTopicStats/{userID}")]
        public IActionResult GetUserTopicStats(int userID)
        {
            List<Object> stats = new User().GetUserTopicStats(userID);

            if (stats == null || stats.Count == 0)
            {
                return NotFound();
            }

            return Ok(stats);
        }


        [HttpGet("UserAverageAndGradesPerMonth/{userID}")]
        public List<Object> GetUserAverageAndGradesPerMonth(int userID)
        {
            User u = new User();
            return u.GetUserAverageAndGradesPerMonth(userID);

        }


        [HttpGet("AllTestAverageAndGrades/{userID}")]
        public Object AllTestAverageAndGrades(int userID)
        {
            return new User().AllTestAverageAndGrades(userID);
        }


        [HttpGet("getTestSummaryPerUser/{userID}")]
        public List<Object> getTestSummaryPerUser(int userID)
        {
            User u = new User();
            return u.getTestSummaryPerUser(userID);
        }


    }
}
