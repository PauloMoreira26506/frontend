import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

const handleKeyDown = (event) => {
  if(event.key === "Enter" && searchTerm.trim() !== ""){
    navigate(`/store/search?search=${encodeURIComponent(searchTerm)}`);
  }
}

  return (
    <>
      <div className={styles.searchBar}>
        <i class="bi bi-search"></i>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown}/>
      </div>
    </>
  );
};

export default SearchBar;
