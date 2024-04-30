import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SketchPicker } from 'react-color';


function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [color, setColor] = useState('#fff');

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  const handleColorChange = (color) => {
    setColor(color.hex);
    // ここでリアクションをAPIに送信するロジックを追加する
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1>{post.author_name}</h1>
      <p>{post.content}</p>
      <div>
        <h3>Color your reaction:</h3>
        <SketchPicker color={color} onChangeComplete={handleColorChange} />
      </div>
    </div>
  );
}

export default PostPage;
