import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const themes = [
        "light", "dark", "cupcake",
        "retro", "cyberpunk", "valentine", "halloween",  "aqua",
        "lofi",  "dracula",
         "lemonade",  "coffee"
      ];
  const handleThemeChange = (event) => {
    document.documentElement.setAttribute('data-theme', event.target.value);
  };

  return (
    <div className="dropdown dropdown-end absolute top-4 right-4 z-50">
  <div tabIndex={0} role="button" className="btn m-1">
    テーマ選択
    <svg width="12px" height="12px" className="ml-2 h-4 w-4 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
    </svg>
  </div>
  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
    {themes.map(theme => (
      <li key={theme}>
        <input
          type="radio"
          name="theme-dropdown"
          className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label={theme}
          value={theme}
          onChange={handleThemeChange}
        />
      </li>
    ))}
  </ul>
</div>
  );
}

export default Header;

