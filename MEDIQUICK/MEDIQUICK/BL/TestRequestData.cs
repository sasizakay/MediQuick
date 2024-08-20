namespace MEDIQUICK.BL
{
    public class TestRequestData
    {
        //מחלקה לטיפול במענה על שאלה במבחן
        public int questionId { get; set; }
        public int testId { get; set; }
        public int userId { get; set; }
        public bool isCorrect { get; set; }
        public bool lastQ { get; set; }
        public string answerChosen { get; set; }
    }
}
