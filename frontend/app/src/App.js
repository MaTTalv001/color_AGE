import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PostListPage from './components/PostListPage';
import PostPage from './components/PostPage';
import CreatePostPage from './components/CreatePostPage';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
    </>
  );
}


export default App;

