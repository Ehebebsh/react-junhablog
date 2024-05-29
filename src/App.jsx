import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import New from './pages/New';
import NotFound from './pages/NotFound';

function App() {
  const [blogs, setBlogs] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 localStorage에서 블로그 데이터를 불러옴
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);

    // idRef를 초기화 (저장된 블로그의 최대 id 값을 기준으로 설정)
    const maxId = storedBlogs.reduce((max, blog) => Math.max(max, blog.id), 0);
    idRef.current = maxId + 1;
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home blogs={blogs} />} />
          <Route path="/detail/:id" element={<Detail blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/edit/:id" element={<Edit blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/new" element={<New setBlogs={setBlogs} idRef={idRef} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
