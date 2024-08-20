namespace MEDIQUICK.BL
{
    public class Topic
    {
        int topicId;
        string topicName;
        DBServices dbs = new DBServices();
        public Topic() { }

        public Topic(int topicId, string topicName)
        {
            TopicId = topicId;
            TopicName = topicName;
        }

        public int TopicId { get => topicId; set => topicId = value; }
        public string TopicName { get => topicName; set => topicName = value; }

        public List<Topic> GetTopics()
        {
            return dbs.GetTopics();
        }

        public List<object> GetUserProgress(int userID)
        {
            return dbs.GetUserProgress(userID);
        }
    }
}
