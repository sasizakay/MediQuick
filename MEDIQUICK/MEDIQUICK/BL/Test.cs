using MEDIQUICK.Controllers;
using System.Net;

namespace MEDIQUICK.BL
{
    public class Test
    {
        int grade;
        string testId;
        DateTime duration;
        List<Question> questionsList;
        DBServices dbs = new DBServices();

        public Test()
        {
        }
        public Test(int grade, DateTime duration, List<Question> questionsList)
        {
            Grade = grade;
            Duration = duration;
            QuestionsList = questionsList;
        }

        public int Grade { get => grade; set => grade = value; }
        public DateTime Duration { get => duration; set => duration = value; }
        public List<Question> QuestionsList { get => questionsList; set => questionsList = value; }
        public string Testid { get => testId; set => testId = value; }

        public Object CreateTest(int userId)
        {
            return dbs.CreateTest(userId);
            
        }

        public Question Test_HandleQuestionAnswer(int userId, int testId, int questionId, bool isCorrect, bool lastQ,string answerChosen)
        {
            return dbs.Test_HandleQuestionAnswer(userId, testId, questionId, isCorrect, lastQ,answerChosen);

        }

        public int EndTest(int testId)
        {
            return dbs.EndTest(testId);
            
        }
        public Object CalculateAndUpdateScoreAndGetDuration(int testId)
        {
            return dbs.CalculateAndUpdateScoreAndGetDuration(testId);
        }
        public Object GetTestSummary(int testId)
        {
            return dbs.GetTestSummary(testId);
        }
        
        public Object GetQuestionDetailsInTest(int testId)
        {
            return dbs.GetQuestionDetailsInTest(testId);
        }
    }
}
