import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css';
import Button from '../components/Button';

const Detail = ({ blogs, setBlogs }) => { 
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find(blog => blog.id === parseInt(id));

  if (!blog) {
    return <div>블로그를 찾을 수 없습니다.</div>;
  }

  const handleDelete = () => {
    const updatedBlogs = blogs.filter(blog => blog.id !== parseInt(id));
    
    // 업데이트된 블로그 목록을 localStorage에 저장
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    // 상태 업데이트
    setBlogs(updatedBlogs);
    navigate('/', { replace: true }); // 홈 페이지로 이동
  };

  return (
    <div className="detail-container">
      <h1 className="detail-title">{blog.title}</h1>
      <div className="detail-tags">{blog.tags.join(', ')}</div>
      <div className="detail-date">{new Date(blog.date).toLocaleDateString('ko-KR')}</div>
      <p className="detail-content">{blog.content}</p>
      <div className="button-container">
        <Button title="삭제하기" type="NEGATIVE" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default Detail;
