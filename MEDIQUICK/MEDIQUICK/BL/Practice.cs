namespace MEDIQUICK.BL
{
    public class Practice
    {
        string practiceSerialNuber;
        string selectedTopics;
        string selectedDiffLevels;
        List<Question> questionsList;
        DBServices dbs = new DBServices();
        int userId;

        public Practice() { }

        //public Practice(string practiceSerialNuber, List<Question> questionsList)
        //{
        //    PracticeSerialNuber = practiceSerialNuber;
        //    QuestionsList = questionsList;
        //}

        //public Practice(string selectedTopics, string selectedDiffLevels)
        //{
        //    SelectedTopics = selectedTopics;
        //    SelectedDiffLevels = selectedDiffLevels;
        //}

        public Practice(List<Question> questionsList, string selectedTopics, string selectedDiffLevels)
        {
            QuestionsList = questionsList;
            SelectedTopics = selectedTopics;
            SelectedDiffLevels = selectedDiffLevels;
        }

        public Practice(string practiceSerialNuber, List<Question> questionsList, string selectedTopics, string selectedDiffLevels)
        {
            PracticeSerialNuber = practiceSerialNuber;
            QuestionsList = questionsList;
            SelectedTopics = selectedTopics;
            SelectedDiffLevels = selectedDiffLevels;
        }

        public string PracticeSerialNuber { get => practiceSerialNuber; set => practiceSerialNuber = value; }
        public List<Question> QuestionsList { get => questionsList; set => questionsList = value; }
        public string SelectedTopics { get => selectedTopics; set => selectedTopics = value; }
        public string SelectedDiffLevels { get => selectedDiffLevels; set => selectedDiffLevels = value; }
        public int UserId { get => userId; set => userId = value; }

        public List<Object> GeneratePractice(string selectedTopics, string selectedDiffLevels,int userId)
        {
            return dbs.GeneratePractice(selectedTopics, selectedDiffLevels ,userId);
        }

    }
}
