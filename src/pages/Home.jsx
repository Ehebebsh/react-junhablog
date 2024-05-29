import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Button from "../components/Button";
import List from '../components/List'; 
import Drawer from '../components/Drawer'; 

const Home = ({ blogs }) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const onClickHandler = () => {
    navigate('/new');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSelectTag = (selectedTag) => {
    const normalizedTag = selectedTag.replace(/\s+/g, '').toLowerCase();
    setFilteredBlogs(blogs.filter(blog => 
      blog.tags.some(tag => tag.replace(/\s+/g, '').toLowerCase() === normalizedTag)
    ));
    setIsDrawerOpen(false);
  };

  const handleShowAll = () => {
    setFilteredBlogs(blogs);
    setIsDrawerOpen(false);
  };

  const allTags = [...new Set(blogs.flatMap(blog => blog.tags.map(tag => tag.replace(/\s+/g, '').toLowerCase())))];

  return (
    <div>
      <Header 
        title="준하의 블로그" 
        leftchild={<Button title="=" onClick={toggleDrawer} />} 
        rightchild={<Button title="새 글 쓰기" onClick={onClickHandler} />} 
      />
      {isDrawerOpen && (
        <Drawer 
          tags={allTags} 
          onSelectTag={handleSelectTag} 
          onShowAll={handleShowAll}
          onClose={toggleDrawer}
        />
      )}
      <div>
        <List blogs={filteredBlogs} />
      </div>
    </div>
  );
};

export default Home;
