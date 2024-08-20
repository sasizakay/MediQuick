using MEDIQUICK.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MEDIQUICK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        // GET: api/<QuestionsController>
        [HttpPost("/Gemini")]
        public Task<string> Post([FromBody] string content)
        {
            Question question = new Question();
            return question.genQ(content);
        }

        // GET: api/<QuestionsController>
        [HttpPost("/GeminiForSimilarity")]
        public Task<string> GeminiForSimilarity([FromBody] string content)
        {
            Question question = new Question();
            return question.GeminiForSimilarity(content);
        }
        // GET: api/<QuestionsController>
        [HttpGet("/ReadQuestions")]
        public IEnumerable<Question> ReadQuestions()
        {
            Question q = new Question();
            return q.ReadQuestions();
        }

        // GET: api/<QuestionsController>
        [HttpGet("topicId/{topicId}/userId/{userId}")]
        public List<Object> GetQuestionsByTopicAndId(int topicId, int userId)
        {
            Question q = new Question();
            return q.GetQuestionsByTopicAndId(topicId, userId);
        }

        // GET: api/<QuestionsController>
        [HttpPost("GetQuestionsDetailsFromArray")]
        public List<Object> GetQuestionsDetailsFromArray([FromBody] List<int> questionIds)
        {
            Question q = new Question();
            return q.GetQuestionsDetailsFromArray(questionIds);
        }
        // GET: api/<QuestionsController>
        [HttpGet("qId/{qId}/topicName/{topicName}")]
        public List<Object> GetQuestionsByTopic(int qId, string topicName)
        {
            Question q = new Question();
            return q.GetQuestionsByTopic(qId, topicName);
        }
        // GET: api/<QuestionsController>
        [HttpGet("userId/{userId}")]
        public List<Question> GetFavouriteQuestionsByUser(int userId)
        {
            Question q = new Question();
            return q.GetFavouriteQuestionsByUser(userId);
        }
        // GET api/<QuestionsController>/5
        [HttpGet("{id}")]
        public Question Get(int id)
        {
            Question q = new Question();
            return q.GetQuestion(id);
        }

        // POST api/<QuestionsController>
        [HttpPost]
        public int InsertQuestion([FromBody] Question value)
        {
            return value.Insert();
        }

        // POST api/<QuestionsController>
        [HttpPost("questionId/{questionId}/userId/{userId}")]
        public int toggleFavouriteQuestion(int questionId, int userId)
        {
            Question q = new Question();
            return q.toggleFavouriteQuestion(questionId, userId);

        }

        //// POST api/<QuestionsController>
        //[HttpPost("questionId/{questionId}/userId/{userId}/isCorrect/{isCorrect}")]
        //public int HandleQuestionAnswer(int questionId, int userId, bool isCorrect)
        //{
        //    Question q = new Question();
        //    return q.HandleQuestionAnswer(questionId, userId, isCorrect);
        //}

        // POST api/<QuestionsController>
        [HttpPost("/HandleQuestionAnswer")]
        public int HandleQuestionAnswer([FromBody] PracticeRequestData prd)
        {
            Question q = new Question();
            return q.HandleQuestionAnswer(prd.qId, prd.userId, prd.isCorrect);
        }


        // PUT api/<QuestionsController>/5
        [HttpPut("{isCorrect}")]
        public void Put(bool isCorrect, [FromBody] int id)
        {
            Question q = new Question();
            q.updateQuestionDiffLevel(id, isCorrect);
        }

        [HttpPut("id/{id}")]
        public int Put(int id, [FromBody] int newStatus)
        {
            Question q = new Question();
            return q.changeQuestionStatus(id, newStatus);
        }

        [HttpPatch("/updateQuestionDetails")]
        public bool updateQuestionDetail([FromBody] Question q)
        {
            return new Question().updateQuestionDetail(q);
        }

        // DELETE api/<QuestionsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}