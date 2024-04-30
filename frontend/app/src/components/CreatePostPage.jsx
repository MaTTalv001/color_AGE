import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreatePostPage() {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#000000');
  const [era, setEra] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      author_name: authorName,
      content: content,
      color_code: color,
      color_name: "Custom Color",
      era: era
    };
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/posts');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 my-20">
      <h1 className="text-3xl font-bold text-center mb-10">こどもごころを投稿しましょう</h1>
      <p className="text-xl  text-center mb-5">あるあるネタ、思い出、当時のこだわり、出来事など</p>
      <div className="divider divider-accent mb-10"></div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="authorName" className="block mb-2 font-bold">投稿者名:</label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-bold">内容:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">あなたにとってどんな色？</label>
          <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
        </div>
        <div className="mb-4">
          <label htmlFor="era" className="block mb-2 font-bold">年代:</label>
          <select
            id="era"
            value={era}
            onChange={(e) => setEra(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">選択してください</option>
            <option value="就学前">就学前</option>
            <option value="小学校低学年">小学校低学年</option>
            <option value="小学校高学年">小学校高学年</option>
            <option value="中学校">中学校</option>
            <option value="その他">その他</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/posts" className="btn btn-ghost mx-10 mt-6">一覧へ戻る</Link>
      </form>
      
    </div>
  );
}

export default CreatePostPage;
