import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Edit.css';

const Edit = ({ blogs, setBlogs }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    // id에 해당하는 블로그 데이터를 찾아서 불러옴
    const blog = blogs.find(blog => blog.id === parseInt(id));
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setTags(blog.tags.join(', ')); // 태그를 문자열로 변환하여 초기값 설정
    }
  }, [blogs, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정된 데이터를 업데이트
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === parseInt(id)) {
        return { ...blog, title, content, tags: tags.split(',').map(tag => tag.trim()) };
      }
      return blog;
    });
    setBlogs(updatedBlogs);
    
    // 업데이트된 블로그 목록을 localStorage에 저장
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    // 수정 후 홈 페이지로 이동
    navigate(`/`, { replace: true });
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">수정 페이지</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="edit-form-item">
          <label htmlFor="title" className="edit-form-label">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="edit-form-input" />
        </div>
        <div className="edit-form-item">
          <label htmlFor="tags" className="edit-form-label">Tags:</label>
          <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="edit-form-input" placeholder="태그를 입력하세요 (쉼표로 구분)" />
        </div>
        <div className="edit-form-item">
          <label htmlFor="content" className="edit-form-label">Content:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="edit-form-textarea" />
        </div>
        <Button title="수정 완료" onClick={handleSubmit} type="POSITIVE" className="edit-form-button" />
      </form>
    </div>
  );
};

export default Edit;
