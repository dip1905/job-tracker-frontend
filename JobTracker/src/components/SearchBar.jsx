import React, { useState } from "react";
import "./Searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    onSearch(text);
  };

  

  return (
    <div className="bar">
      <input
        placeholder="Search Company"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

