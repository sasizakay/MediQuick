using MEDIQUICK.BL;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class calendarTasksController : ControllerBase
{
    private readonly DBServices _dbServices = new DBServices();

    // GET: api/Tasks/GetTaskByDate
    [HttpGet("GetTaskByUser")]
    public List<Object> GetTaskByUser(int userId)
    {
        calendarTasks t=new calendarTasks();
        return t.GetTaskByUser(userId);
    }

    //// POST: api/Tasks/SaveTask
    //[HttpPost("AddTask/{userId}")]
    //public bool AddTask(int userId,[FromBody] calendarTasks task)
    //{
    //    calendarTasks t = new calendarTasks();
    //    return t.AddTask(userId, task);

    //}

    [HttpPost("AddTask/{userId}")]
    public IActionResult AddTask(int userId, [FromBody] calendarTasks task)
    {
        calendarTasks t = new calendarTasks();
        bool result = t.AddTask(userId, task);

        return Ok(new { success = result }); // החזרת JSON תקין
    }

    // DELETE: api/Tasks/DeleteTask/{id}
    [HttpPatch("makeTaskInActive/{taskId}")]
    public bool makeTaskInActive(int taskId)
    {
        calendarTasks t= new calendarTasks();
        return t.makeTaskInActive(taskId);
    }
    
    [HttpPatch("updateTask")]
    public bool updateTask([FromBody] calendarTasks task)
    {
        calendarTasks t= new calendarTasks();
        return t.updateTask(task);
    }
}
