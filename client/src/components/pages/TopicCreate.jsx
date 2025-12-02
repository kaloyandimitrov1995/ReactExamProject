export default function TopicCreate() {
 
  return (
    <section>
      <h2>Create a Topic</h2>
      <form>
        <label>
          Title
          <input
            type="text"
            name="title"
            value="TEXT"
            required
          />
        </label>

        <label>
          Content
          <textarea
            name="content"
            rows="6"
            placeholder="Share your latest freelance story or rant..."
            value="TEXT"
            required
          />
        </label>

        <button>
          Post Topic
        </button>
      </form>
    </section>
  );
}
