import { useState, useEffect } from "react";

import "../../styles/searching.sass";
import SearchedVideo from "./SearchedVideo";
import { useNavigate } from "react-router-dom";

export default function Searching() {
  const history = useNavigate();

  const [title, setTitle] = useState("");

  function search(event) {
    event.preventDefault();
    history(`/search/${title}`);
  }

  return (
    <form onSubmit={search}>
      <input
        type="search"
        id="myInput"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Search for title..."
        title="Type in a title"
        className="searching-content"
      />
    </form>
  );
}
