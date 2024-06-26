import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
  }, []);

 
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts?page=${currentPage}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error('投稿を取得できませんでした:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const openModal = (postId) => {
    setCurrentPostId(postId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const submitReaction = (event) => {
    event.preventDefault();
    const reactionData = {
      reaction: {
        color_code: selectedColor,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/posts/${currentPostId}/reactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reactionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // リアクションの登録が成功した後の処理
        if (searchResults.length > 0) {
          // 検索結果が表示されている場合は、searchResultsを更新
          const updatedSearchResults = searchResults.map((post) => {
            if (post.id === currentPostId) {
              return {
                ...post,
                reactions: [...post.reactions, data],
              };
            }
            return post;
          });
          setSearchResults(updatedSearchResults);
        } else {
          // 検索結果が表示されていない場合は、postsを更新
          const updatedPosts = posts.map((post) => {
            if (post.id === currentPostId) {
              return {
                ...post,
                reactions: [...post.reactions, data],
              };
            }
            return post;
          });
          setPosts(updatedPosts);
        }
        closeModal();
      })
      .catch((error) => console.error('リアクションの登録に失敗しました:', error));
  };

  const searchByColor = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/search_by_color?color=${selectedColor.slice(1)}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setPosts(data);
        closeSearchModal();
      })
      .catch(error => {
        console.error('検索に失敗しました:', error);
      });
  };

  const post = {
    title: "Color AGE",
    url: "https://color-age.vercel.app/",
  };

  const handleTweet = () => {
    const tweetText = `【Color AGE】"色"を投稿しました! #Color_AGE #RUNTEQ `;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      post.url
    )}&text=${encodeURIComponent(tweetText)}`;

    // 新しいタブでTwitter共有ページを開く
    window.open(twitterUrl, "_blank");
  };

  // // RGB色空間での色の差を計算するヘルパー関数
  // const colorDifference = (color1, color2) => {
  //   const rgb1 = hexToRgb(color1);
  //   const rgb2 = hexToRgb(color2);

  //   const rDiff = Math.abs(rgb1.r - rgb2.r);
  //   const gDiff = Math.abs(rgb1.g - rgb2.g);
  //   const bDiff = Math.abs(rgb1.b - rgb2.b);

  //   return rDiff + gDiff + bDiff;
  // };

  // // 16進数カラーコードをRGB色空間に変換するヘルパー関数
  // const hexToRgb = (hex) => {
  //   const r = parseInt(hex.substring(1, 3), 16);
  //   const g = parseInt(hex.substring(3, 5), 16);
  //   const b = parseInt(hex.substring(5, 7), 16);
  //   return { r, g, b };
  // };

  if (loading) return <div className="text-center mt-10"><p>Loading...</p></div>;
  if (error) return <div className="text-center mt-10"><p>Error loading posts: {error}</p></div>;

  return (
    <div className="container mx-auto px-4 mt-20">
      <h1 className="text-3xl font-bold text-center mb-5">投稿一覧</h1>
      <p className="text-xl text-center mb-5">こどもの頃に思ったこと、あったこと、あるあるなどを"色"と共に投稿しましょう</p>
      <p className="text-xl text-center mb-5">投稿に対して色でリアクションしましょう</p>
      <div className="flex justify-center mb-5">
        <Link to="/create" className="btn btn-wide btn-accent mx-2">新規投稿</Link>
        <button className="btn btn-wide btn-secondary mx-2" onClick={openSearchModal}>色で検索</button>
      </div>
      <div className="flex justify-center mb-5">
      <button className="btn btn-wide btn-ghost mx-2" onClick={() => window.location.reload()}>リセット</button>
      </div>
      <div className="divider divider-accent mb-10"></div>

    {!searchResults.length && (
    <div className="flex justify-center my-8">
      {/* ページネーションのボタン */}
      <div className="btn-group">
        <button
          className={`btn btn-outline ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            className={`btn btn-outline ${pageNumber === currentPage ? 'btn-active' : ''}`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`btn btn-outline ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
      {/*ここまでページネーションのボタン*/}
    </div>
    )}
      
    {searchResults.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {searchResults.map(post => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <span className="badge badge-lg" style={{ backgroundColor: post.color_code }}></span>
                <h2 className="card-title ml-2">{post.author_name}</h2>
              </div>
              <p>{post.content}</p>
              <p className="text-sm text-gray-500">年代: {post.era}</p>
              <div className="mt-4">
                <p className="text-sm font-bold">みんなのリアクション:</p>
                <div className="flex flex-wrap mt-2">
                  {post.reactions.map(reaction => (
                    <span
                      key={reaction.id}
                      className="badge badge-xs mr-1 mb-1"
                      style={{ backgroundColor: reaction.color_code }}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <button className="btn btn-primary mt-4" onClick={() => openModal(post.id)}>
                  色でリアクション
                </button>
                <button className="btn btn-ghost mt-4" onClick={handleTweet}>
                  <svg className="w-6 h-6" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <span className="badge badge-lg" style={{ backgroundColor: post.color_code }}></span>
                <h2 className="card-title ml-2">{post.author_name}</h2>
              </div>
              <p>{post.content}</p>
              <p className="text-sm">年代: {post.era}</p>
              <div className="mt-4">
                <p className="text-sm font-bold">みんなのリアクション:</p>
                <div className="flex flex-wrap mt-2">
                  {post.reactions.map(reaction => (
                    <span
                      key={reaction.id}
                      className="badge badge-xs mr-1 mb-1"
                      style={{ backgroundColor: reaction.color_code }}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <button className="btn btn-primary mt-4" onClick={() => openModal(post.id)}>
                  色でリアクション
                </button>
                <button className="btn btn-ghost mt-4" onClick={handleTweet}>
                  <svg className="w-6 h-6" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
      {modalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">色で反応しよう</h3>
            <SketchPicker color={selectedColor} onChangeComplete={handleColorChange} />
            <div className="modal-action">
              <form method="dialog" onSubmit={submitReaction}>
                <button type="submit" className="btn btn-primary m-3">Submit Reaction</button>
                <button type="button" className="btn btn-secondary m-3" onClick={closeModal}>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
      {searchModalOpen && (
        <dialog id="search_modal" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">色で検索</h3>
            <SketchPicker color={selectedColor} onChangeComplete={handleColorChange} />
            <div className="modal-action">
              <button className="btn btn-primary m-3" onClick={searchByColor}>検索</button>
              <button className="btn btn-secondary m-3" onClick={closeSearchModal}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default PostListPage;