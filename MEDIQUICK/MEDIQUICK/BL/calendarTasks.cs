using Google.Type;
using MEDIQUICK.BL;
using System.Threading.Tasks;

namespace MEDIQUICK.BL
{
    public class calendarTasks
    {
        int taskId;
        string TaskDescription;
        System.DateTime taskDate;
        bool isActive;
        DBServices dbs = new DBServices();


        public calendarTasks()
        {

        }

        public calendarTasks(string taskDescription, System.DateTime taskDate)
        {
            TaskDescription1 = taskDescription;
            this.TaskDate = taskDate;
        }

        public int TaskId { get => taskId; set => taskId = value; }
        public string TaskDescription1 { get => TaskDescription; set => TaskDescription = value; }
        public System.DateTime TaskDate { get => taskDate; set => taskDate = value; }

        public bool AddTask(int userId,calendarTasks task)
        {
            return dbs.AddTask(userId, task);
        }
        public List<Object> GetTaskByUser(int userId)
        {
            return dbs.GetTaskByUser(userId);
        }

        public bool makeTaskInActive(int taskId)
        {
            return dbs.makeTaskInActive(taskId);
        }

        public bool updateTask(calendarTasks task)
        {
            return dbs.updateTask(task);
        }
    }
}

