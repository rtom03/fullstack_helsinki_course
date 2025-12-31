const BlogForm = ({ handleCreatePost, handleChange, title, author, url }) => {
  return (
    <div>
      <form onSubmit={handleCreatePost}>
        <label>
          title
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          author
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          url:
          <input type="text" name="url" value={url} onChange={handleChange} />
        </label>
        <br />
        <button>submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
