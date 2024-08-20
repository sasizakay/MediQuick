using MEDIQUICK.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MEDIQUICK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        // GET: api/<TestsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<TestsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("CalculateAndUpdateScoreAndGetDuration/{testId}")]
        public Object CalculateAndUpdateScoreAndGetDuration(int testId)
        {
            return new Test().CalculateAndUpdateScoreAndGetDuration(testId);
        }


        [HttpGet("GetTestSummary/{testId}")]
        public Object GetTestSummary(int testId)
        {
            return new Test().GetTestSummary(testId);
        }

        [HttpGet("GetQuestionDetailsInTest/{testId}")]
        public Object GetQuestionDetailsInTest(int testId)
        {
            return new Test().GetQuestionDetailsInTest(testId);
        }

        // POST api/<TestsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // POST api/<TestsController>
        [HttpPost("userId/{userId}")]
        public Object CreateTest(int userId)
        {
            Test t = new Test();
            return t.CreateTest( userId);

        }

        //// POST api/<TestsController>
        //[HttpPost("userId/{userId}/testId/{testId}/questionId/{questionId}/isCorrect/{isCorrect}")]

        //public Question Test_HandleQuestionAnswer(int userId, int testId, int questionId,bool isCorrect)
        //{
        //    Test t = new Test();
        //    return t.Test_HandleQuestionAnswer(userId,testId,questionId,isCorrect);
        //}

        // POST api/<TestsController>
        [HttpPost("/HandleTestQuestionAnswer")]
        public Question Test_HandleQuestionAnswer(TestRequestData trd)
        {
            Test t = new Test();
            return t.Test_HandleQuestionAnswer(trd.userId, trd.testId, trd.questionId, trd.isCorrect, trd.lastQ,trd.answerChosen);
        }

        // POST api/<TestsController>
        [HttpPost("testId/{testId}")]
        public int EndTest(int testId)
        {
            Test t = new Test();
            return t.EndTest(testId);

        }

        // PUT api/<TestsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TestsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        //[HttpPost]
        //[Route("save-pdf")]
        //public async Task<IActionResult> SavePdf(IFormFile pdf)
        //{
        //    if (pdf == null || pdf.Length == 0)
        //        return BadRequest("No file uploaded.");

        //    // נתיב לשמירת הקובץ בשרת
        //    var savePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "pdfs", pdf.FileName);

        //    using (var stream = new FileStream(savePath, FileMode.Create))
        //    {
        //        await pdf.CopyToAsync(stream);
        //    }

        //    return Ok("PDF saved successfully.");
        //}

        //[HttpPost]
        //[Route("save-html-summary")]
        //public async Task<IActionResult> SaveHtmlSummary([FromForm] int userId, [FromForm] int testId, [FromForm] string htmlContent, [FromForm] string fileName)
        //{
        //    if (string.IsNullOrEmpty(htmlContent))
        //        return BadRequest("No content provided.");

        //    // יצירת נתיב השמירה
        //    var savePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "summaries", $"user-{userId}");
        //    if (!Directory.Exists(savePath))
        //        Directory.CreateDirectory(savePath);

        //    var filePath = Path.Combine(savePath, fileName);

        //    await System.IO.File.WriteAllTextAsync(filePath, htmlContent);

        //    return Ok("Summary saved successfully.");
        //}

        //[HttpGet]
        //[Route("get-summaries")]
        //public IActionResult GetSummaries(int userId)
        //{
        //    var savePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "summaries", $"user-{userId}");

        //    if (!Directory.Exists(savePath))
        //        return NotFound("No summaries found for this user.");

        //    var files = Directory.GetFiles(savePath, "*.html");

        //    if (files.Length == 0)
        //        return NotFound("No summaries found for this user.");

        //    var summaries = files.Select(file => new
        //    {
        //        FileName = Path.GetFileName(file),
        //        FilePath = $"/summaries/user-{userId}/{Path.GetFileName(file)}", // וודא שהנתיב תקין
        //        DateCreated = System.IO.File.GetCreationTime(file)
        //    }).ToList();

        //    return Ok(summaries);
        //}



    }
}
