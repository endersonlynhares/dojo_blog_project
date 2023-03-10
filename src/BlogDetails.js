import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const deleteBlog = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE"
    }).then(()=>{
      alert("Blog deletado com sucesso!")
      navigate("/")
    })
  };

  return (
    <div className="blog-details">
      {isPending && <div> Loading... </div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <small>Written by {blog.author}</small>

          <p>{blog.body}</p>
        </article>
      )}
      <button onClick={deleteBlog}>Delete</button>
    </div>
  );
};

export default BlogDetails;
