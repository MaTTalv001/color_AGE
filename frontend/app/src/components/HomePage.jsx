import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const handleThemeChange = (event) => {
    document.documentElement.setAttribute('data-theme', event.target.value);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-cover bg-center rounded-lg shadow-xl" style={{ backgroundImage: `url('/top.png')`, width: '80vw', height: '50vh' }}></div>
      
      <div className="text-center mt-4">
        <h1 className="text-4xl font-bold text-primary ">Color AGE</h1>
        <p className="text-md mt-2">思い出を色で共有しましょう</p>
        <h3 className="text-lg mt-2 font-bold">【こどもごころ編】</h3>
      </div>

      

      <Link to="/posts" className="btn btn-primary mt-6">投稿一覧へ</Link>
    </div>
  );
}

export default HomePage;

