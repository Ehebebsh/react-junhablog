import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import './New.css';

const New = ({ setBlogs, idRef }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const onClickHandler = () => {
    navigate(-1);
  };

  const onSubmitHandler = () => {
    const newBlog = {
      id: idRef.current++, // 부모 컴포넌트에서 전달된 idRef를 사용
      title,
      tags: tags.split(',').map(tag => tag.trim()),
      date: new Date().toISOString(), // 현재 날짜 추가
      content,
    };

    // 새로운 블로그를 추가하여 localStorage에 저장
    const updatedBlogs = [...(JSON.parse(localStorage.getItem('blogs')) || []), newBlog];
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    // 상태 업데이트
    setBlogs(updatedBlogs);
    navigate('/', { replace: true });
  };

  return (
    <div className="container">
      <Header 
        title="준하의 블로그" 
        leftchild={<Button title="뒤로가기" onClick={onClickHandler} />} 
        rightchild={<Button title="작성완료" onClick={onSubmitHandler} type="POSITIVE" />} 
      />
      <div>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="제목을 입력하세요" 
        />
        <input 
          type="text" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
          placeholder="태그를 입력하세요 (쉼표로 구분)" 
        />
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="내용을 입력하세요" 
        />
      </div>
    </div>
  );
};

export default New;
