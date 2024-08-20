namespace MEDIQUICK.BL
{
    public class PracticeRequestData
    {
        //מחלקה לטיפול במענה על שאלה בתרגול
        public int qId { get; set; }
        public int userId { get; set; }
        public bool isCorrect { get; set; }
    }
}
