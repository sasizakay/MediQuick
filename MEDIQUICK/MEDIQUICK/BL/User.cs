using Microsoft.AspNetCore.Identity;

namespace MEDIQUICK.BL
{
    public class User : IdentityUser
    {
        int userID;
        string firstName;
        string lastName;
        string email;
        string password;
        string phoneNumber;
        bool isAdmin;
        bool isActive;
        DBServices dbs = new DBServices();

        public User() { }

        public User(string firstName, string lastName, string email, string password, string phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            PhoneNumber = phoneNumber;
        }


        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string PhoneNumber { get => phoneNumber; set => phoneNumber = value; }
        public bool IsAdmin { get => isAdmin; set => isAdmin = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public int UserID { get => userID; set => userID = value; }

        public User InsertUser()
        {
            return dbs.InsertUser(this);
        }
        public User Login(string email, string password)
        {
            return dbs.Login(email, password);
        }
        public List<User> ReadUsers()
        {
            return dbs.ReadUsers();
        }


        public bool ChangeUsersStatus(string email, bool newStatus)
        {
            return dbs.ChangeUsersStatus(email, newStatus);
        }
        public bool ChangeAdminStatus(string email, bool newAdminStatus)
        {
            return dbs.ChangeAdminStatus(email, newAdminStatus);
        }

        public bool updateUserDetail(User u)
        {
            return dbs.updateUserDetail(u);
        }

        public List<Object> GetUserTopicStats(int userID)
        {
            return dbs.GetNumQuestionsAndPercenSuccessPerTopicPerUser(userID);
        }

        public List<Object> GetUserAverageAndGradesPerMonth(int userID)
        {
            return dbs.GetUserAverageAndGradesPerMonth(userID);
        }

        public Object AllTestAverageAndGrades(int userID)
        {
            return dbs.AllTestAverageAndGrades(userID);
        }

        public List<Object> getTestSummaryPerUser(int userID)
        {
            return dbs.getTestSummaryPerUser(userID);
        }

        public int ChangePassword(int userId, string currentPassword, string newPassword)
        {
            return dbs.ChangePassword(userId,currentPassword,newPassword);

        }

    }
}
