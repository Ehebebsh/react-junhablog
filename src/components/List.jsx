import './List.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('ko-KR', options);
};

const List = ({ blogs }) => {
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // 수정 페이지로 이동
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <Link to={`/detail/${blog.id}`} className="blog-link">
            <div className="blog-title">{blog.title}</div>
            <div className="blog-tags">{blog.tags.join(', ')}</div>
            <div className="blog-date">{formatDate(blog.date)}</div>
          </Link>
          <div className="buttons-container">
            <Button title="수정하기" onClick={() => handleEdit(blog.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
