using Microsoft.AspNetCore.Mvc;

namespace MEDIQUICK.BL
{
    public class Question
    {
        int questionSerialNumber;
        string content;
        string correctAnswer;
        string wrongAnswer1;
        string wrongAnswer2;
        string wrongAnswer3;
        string explanation;
        string topic;
        int difficulty = 1;
        int status;
        string creator;
        int totalAnswers;
        int totalCorrectAnswers;
        DBServices dbs = new DBServices();


        public Question()
        {

        }

        public Question(int questionSerialNumber, int difficulty, string content, string correctAnswer,
            string wrongAnswer1, string wrongAnswer2, string wrongAnswer3, string explanation, int status,
            string creator, int totalAnswers, int totalCorrectAnswers, string topic)
        {
            QuestionSerialNumber = questionSerialNumber;
            Difficulty = difficulty;
            Content = content;
            CorrectAnswer = correctAnswer;
            WrongAnswer1 = wrongAnswer1;
            WrongAnswer2 = wrongAnswer2;
            WrongAnswer3 = wrongAnswer3;
            Explanation = explanation;
            Status = status;
            Creator = creator;
            TotalAnswers = totalAnswers;
            TotalCorrectAnswers = totalCorrectAnswers;
            Topic = topic;
        }

        public int QuestionSerialNumber { get => questionSerialNumber; set => questionSerialNumber = value; }
        public int Difficulty { get => difficulty; set => difficulty = value; }
        public string Content { get => content; set => content = value; }
        public string CorrectAnswer { get => correctAnswer; set => correctAnswer = value; }
        public string WrongAnswer1 { get => wrongAnswer1; set => wrongAnswer1 = value; }
        public string WrongAnswer2 { get => wrongAnswer2; set => wrongAnswer2 = value; }
        public string WrongAnswer3 { get => wrongAnswer3; set => wrongAnswer3 = value; }
        public string Explanation { get => explanation; set => explanation = value; }
        public int Status { get => status; set => status = value; }
        public string Creator { get => creator; set => creator = value; }
        public int TotalAnswers { get => totalAnswers; set => totalAnswers = value; }
        public int TotalCorrectAnswers { get => totalCorrectAnswers; set => totalCorrectAnswers = value; }
        public string Topic { get => topic; set => topic = value; }

        public int Insert()
        {
            return dbs.InsertQuestion(this);
        }

        public int toggleFavouriteQuestion(int questionId, int userId)
        {
            return dbs.toggleFavouriteQ(questionId, userId);

        }
        public int HandleQuestionAnswer(int questionId, int userId, bool isCorrect)
        {
            return dbs.HandleQAnswer(questionId, userId, isCorrect);

        }

        public void updateQuestionDiffLevel(int id, bool isCorrect)
        {
            dbs.UpdateDifficultyLevel(id, isCorrect);
        }


        public Question GetQuestion(int id)
        {
            return dbs.GetQuestion(id);
        }
        public List<Question> GetFavouriteQuestionsByUser(int userId)
        {
            return dbs.GetFavouriteQuestionsUser(userId);
        }
        public IEnumerable<Question> ReadQuestions()
        {
            return dbs.ReadQuestions();
        }

        public Task<string> genQ(string content)
        {
            Gemini gemini = new Gemini();
            Task<string> testString = gemini.GenerateContent(content);
            return testString;
        }
        public Task<string> GeminiForSimilarity(string content)
        {
            Gemini gemini = new Gemini();
            Task<string> testString = gemini.GeminiForSimilarity(content);
            return testString;
        }
        public List<Object> GetQuestionsByTopicAndId(int topicId, int userId)
        {
            return dbs.GetQuestionsByTopicAndId(topicId, userId);
        }
        public List<Object> GetQuestionsDetailsFromArray(List<int> questionIds)
        {
            return dbs.GetQuestionsDetailsFromArray(questionIds);
        }

        public List<Object> GetQuestionsByTopic(int qId, string topicName)
        {
            return dbs.GetQuestionsByTopic(qId, topicName);
        }
        public int changeQuestionStatus(int id, int newStatus)
        {
            return dbs.changeQuestionStatus(id, newStatus);
        }

        public bool updateQuestionDetail(Question q)
        {
            return dbs.updateQuestionDetail(q);
        }
    }
}